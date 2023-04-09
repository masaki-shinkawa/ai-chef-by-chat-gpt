import Image from "next/image";
import React, { useState } from "react";

interface BasicAccordionOptions {
  isOpen?: boolean;
}

interface BasicAccordionProps {
  label: string;
  options?: BasicAccordionOptions;
  children?: JSX.Element;
}

export const BasicAccordion = ({
  label,
  options,
  children,
}: BasicAccordionProps) => {
  const [isOpen, setIsOpen] = useState(options?.isOpen ?? false);

  const handleHeaderClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <button
        type="button"
        className="relative w-full py-3 pl-3 pr-10 text-left bg-accent-500 text-white font-bold rounded-md shadow-lg cursor-default focus:outline-none sm:text-sm"
        onClick={handleHeaderClick}
      >
        <span className="flex items-center">
          <span className="block ml-3 truncate">{label}</span>
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
          <Image
            src="/images/expand.svg"
            className={`${isOpen ? "rotate-0" : "rotate-180"}`}
            alt="select"
            width={20}
            height={20}
          />
        </span>
      </button>
      <div
        className={`z-10 w-full mt-1 bg-white rounded-md shadow-lg ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
