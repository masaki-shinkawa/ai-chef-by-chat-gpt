import Head from "next/head";
import { SuffixInput } from "@/components/input/SuffixInput";
import {
  CustomSelector,
  CustomOption,
} from "@/components/select/CustomSelector";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getItem, setItem } from "@/lib/localStorageHelper";
import { fetcher } from "@/lib/fetcher";
import { MasterResponse } from "@/hooks/api/useApiMaster";
import { AccordionChipList } from "@/features/AccordionChipList";
import { PrimaryButton } from "@/components/button/PrimaryButton";
import { InferType, array, number, object, string, ValidationError } from "yup";
import { CreateMenuResponse, CreateRecipeResponse } from "@/types/api";
import { Menu, MenuCardList } from "@/features/MenuCardList";

const createCustomOptions = (labels: string[]): CustomOption[] => {
  return labels.map((label, index) => ({
    label,
    value: index,
    checked: false,
  }));
};

export default function Home(props: MasterResponse) {
  const [persons, setPerson] = useState(1);
  const [timings, setTimings] = useState<CustomOption[]>(
    createCustomOptions(props.timings)
  );
  const [categories, setCategories] = useState<CustomOption[]>(
    createCustomOptions(props.categories)
  );
  const [seasonings, setSeasonings] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationError | null>(null);
  const [menu, setMenu] = useState<Menu>();

  
  useEffect(() => {
    const seasonings = getItem<string[] | null>("seasonings", null);
    setSeasonings(seasonings ?? props.seasonings);
    const ingredients = getItem<string[] | null>("ingredients", null);
    setIngredients(ingredients ?? props.ingredients);
  }, [props.ingredients, props.seasonings]);

  const onChangePerson = (e: ChangeEvent<HTMLInputElement>) => {
    const persons = Number(e.target.value);
    if (isNaN(persons) || persons <= 0) return;
    setPerson(persons);
  };

  const changeCheckedSelect = (
    options: CustomOption[],
    selectedValue: number,
    dispatcher: Dispatch<SetStateAction<CustomOption[]>>
  ) => {
    const updatedOptions = options.map((option) => {
      return { ...option, checked: option.value === selectedValue };
    });
    dispatcher(updatedOptions);
  };

  const onClickTiming = (selectedValue: number) => {
    changeCheckedSelect(timings, selectedValue, setTimings);
  };

  const onClickCategories = (selectedValue: number) => {
    changeCheckedSelect(categories, selectedValue, setCategories);
  };

  const onChangeSeasonings = (seasonings: string[]) => {
    setItem("seasonings", seasonings);
    setSeasonings(seasonings);
  };

  const onChangeIngredients = (ingredients: string[]) => {
    setItem("ingredients", ingredients);
    setIngredients(ingredients);
  };

  const onSubmit = async () => {
    setErrors(null);
    const schema = object({
      persons: number().required(),
      timing: string().required(),
      categories: array(string().required()).required(),
      seasonings: array(string().required()).required(),
      ingredients: array(string().required()).required(),
    });

    const timingsValue = timings.find((timing) => timing.checked)?.label;
    const categoriesValue = categories.find(
      (category) => category.checked
    )?.label;

    const form: Partial<InferType<typeof schema>> = {
      persons,
      timing: timingsValue,
      categories: categoriesValue ? [categoriesValue] : undefined,
      seasonings,
      ingredients,
    };

    try {
      await schema.validate(form);
    } catch (error) {
      console.error(error);
      return setErrors(error as ValidationError);
    }
    const body = schema.cast(form);

    const createMenuResponse = await fetcher<CreateMenuResponse>("/menu", {
      method: "post",
      body: JSON.stringify({ ...body }),
    });

    setMenu(createMenuResponse.contents[0]);
  };

  const fetchProcedure = async (index: number) => {
    const targetDishes = menu.dishes[index];
    const body = { menu: JSON.stringify(targetDishes) };
    // 手順は後でも良いので非同期
    const res = await fetcher<CreateRecipeResponse>("/recipe", {
      method: "post",
      body: JSON.stringify(body),
    });
    const procedure = res.contents[0].recipe.menu.procedure;
    targetDishes.procedure = procedure;

    setMenu({...menu});
  };

  return (
    <>
      <Head>
        <title>AI Chef</title>
        <meta name="description" content="AI Chef" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-y-4" onSubmit={onSubmit}>
        <section className="flex items-center gap-x-4">
          <SuffixInput
            options={{
              value: persons,
              type: "number",
              onChange: onChangePerson,
            }}
            suffix="人前"
            error={errors?.path === "person" ? errors.message : ""}
          />
          <CustomSelector
            placeholder="食事のタイミング"
            options={timings}
            onClick={onClickTiming}
            error={errors?.path === "timing" ? errors.message : ""}
          />
          <CustomSelector
            placeholder="料理のカテゴリ"
            options={categories}
            onClick={onClickCategories}
            error={errors?.path === "categories" ? errors.message : ""}
          />
        </section>
        <AccordionChipList
          label="使える調味料"
          placeholder="追加する調味料名"
          chips={seasonings}
          onChange={onChangeSeasonings}
        />
        <AccordionChipList
          label="使える食材"
          placeholder="追加する食材名"
          chips={ingredients}
          onChange={onChangeIngredients}
        />
        <PrimaryButton label="生成" onClick={onSubmit} />
        <section>
          <MenuCardList menu={menu} fetchProcedure={fetchProcedure} />
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const response = await fetcher<MasterResponse>("/master");
  return { props: response };
}
