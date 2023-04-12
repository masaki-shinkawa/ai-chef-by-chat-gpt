import { BasicAccordion } from "@/components/accordion/BasicAccordion";
import { ChipListCard } from "@/components/card/ChipListCard";
import { string } from "yup";

interface AccordionChipListProps {
  label: string;
  placeholder: string;
  chips: string[];
  onChange: (chip: string[]) => void;
}

export const AccordionChipList = ({
  label,
  placeholder,
  chips,
  onChange,
}: AccordionChipListProps) => {
  const addChip = (chip: string) => {
    if (!chip || chips.includes(chip)) return;
    try {
      string().max(20).validateSync(chip)
    } catch (error) {
      return 
    }
    onChange([...chips, chip]);
  };

  const deleteChip = (index: number) => {
    if (chips.at(index) == null) return;
    const newChips = [...chips];
    newChips.splice(index, 1);
    onChange(newChips);
  };

  return (
    <section>
      <BasicAccordion label={label} options={{ isOpen: true }}>
        <ChipListCard
          chips={chips}
          placeholder={placeholder}
          addChip={addChip}
          deleteChip={deleteChip}
        />
      </BasicAccordion>
    </section>
  );
};
