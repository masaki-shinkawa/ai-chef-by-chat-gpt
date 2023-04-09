import Image from "next/image";
import React, { useState } from "react";
import { Chip } from "../chip/Chip";

interface ChipListCardProps {
  chips: string[];
  placeholder: string;
  addChip: (chipName: string) => void;
  deleteChip: (index: number) => void;
}

export const ChipListCard = ({
  chips,
  placeholder,
  addChip,
  deleteChip,
}: ChipListCardProps) => {
  const [input, setInput] = useState("");
  const handleAddChip = () => {
    addChip(input);
    setInput("");
  };

  return (
    <div className="px-8 py-4">
      <div className="flex relative mb-4">
        <input
          className="rounded-l-lg flex-1 appearance-none border border-gray w-full py-2 px-4 bg-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-main-500 focus:border-transparent"
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="rounded-r-md inline-flex  items-center px-3 border-t bg-white border-r border-b  border-gray text-gray-500 shadow-sm text-sm"
          onClick={handleAddChip}
        >
          <Image src="/images/add.svg" width={20} height={20} alt="add" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, index) => (
          <Chip id={index} label={chip} onClick={deleteChip} key={chip} />
        ))}
      </div>
    </div>
  );
};
