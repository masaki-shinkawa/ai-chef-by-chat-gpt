import { BasicAccordion } from "@/components/accordion/BasicAccordion";
import { PrimaryButton } from "@/components/button/PrimaryButton";
import { BorderList } from "@/components/list/BorderList";

interface Procedure {
  index: number;
  detail: string;
}

interface Dishes {
  name: string;
  seasonings: {
    name: string;
    amountUnit: string;
  }[];
  ingredients: {
    name: string;
    amountUnit: string;
  }[];
  procedure?: Procedure[];
}

export interface Menu {
  name: string;
  dishes: Dishes[];
}

interface MenuCardListProps {
  menu?: Menu;
  fetchProcedure: (index: number) => void;
}

const ProcedureListOrButton = ({
  procedure,
  fetchProcedure,
  index,
}: Pick<Dishes, "procedure"> &
  Pick<MenuCardListProps, "fetchProcedure"> & { index: number }) => {
  if (!procedure)
    return (
      <PrimaryButton onClick={() => fetchProcedure(index)} label="手順の確認" />
    );
  return (
    <div className="w-full">
      <div className="py-2 flex flex-col justify-center bg-base rounded-lg card">
        <p className=" text-gray-700 text-xl font-bold text-center">調理手順</p>
        <div className="flex gap-2">
          <BorderList
            items={procedure.map(({ index: key, detail: value }) => ({
              key,
              value,
            }))}
            mode="indexTable"
          />
        </div>
      </div>
    </div>
  );
};

export const MenuCardList = ({ menu, fetchProcedure }: MenuCardListProps) => {
  if (!menu) return <></>;
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full">
        <div className="py-2 flex flex-col justify-center bg-base rounded-lg shadow-2xl card gap-2">
          <p className=" text-gray-700 text-xl font-bold text-center">
            {menu.name}
          </p>
          <div className="flex gap-2">
            {menu.dishes.map(
              ({ name, seasonings, ingredients, procedure }, index) => (
                <BasicAccordion
                  key={name}
                  label={name}
                  options={{ isOpen: true }}
                >
                  <>
                    <div className="p-2">
                      <p className="font-bold">調味料</p>
                      <BorderList
                        items={seasonings.map(
                          ({ name: key, amountUnit: value }) => ({ key, value })
                        )}
                      />
                    </div>
                    <div className="p-2">
                      <p className="font-bold">食材</p>
                      <BorderList
                        items={ingredients.map(
                          ({ name: key, amountUnit: value }) => ({ key, value })
                        )}
                      />
                    </div>
                    <div className="p-2">
                      <ProcedureListOrButton
                        procedure={procedure}
                        fetchProcedure={fetchProcedure}
                        index={index}
                      />
                    </div>
                  </>
                </BasicAccordion>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
