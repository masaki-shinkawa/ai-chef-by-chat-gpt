import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";

interface CheckIconProps {
  checked: boolean;
}

interface CustomOptionProps {
  value: number;
  label: string;
  checked: boolean;
  onClick: (value: number, label: string) => void;
}

// onClickはSelectorに1つだけで良いので外部公開するtypeからは取り除く
export type CustomOption = Omit<CustomOptionProps, "onClick">;

interface CustomSelectorProps {
  placeholder: string;
  options: CustomOption[];
  onClick: (value: number) => void;
  error?: string;
}

const CheckIcon = ({ checked }: CheckIconProps) => {
  if (!checked) return null;
  return (
    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
      <Image src="/images/check.svg" alt="checked" width={20} height={20} />
    </span>
  );
};

const CustomOption = ({
  value,
  label,
  checked,
  onClick,
}: CustomOptionProps) => {
  return (
    <li
      className="relative py-2 pl-3 text-gray-900 cursor-default select-none hover:bg-main-500 hover:text-white pr-9 list-none bg-base"
      onClick={() => onClick(value, label)}
    >
      <div className="flex items-center">
        <span className="block ml-3 font-normal truncate">{label}</span>
      </div>
      <CheckIcon checked={checked} />
    </li>
  );
};

export const CustomSelector = ({
  placeholder,
  options,
  onClick,
  error,
}: CustomSelectorProps) => {
  const [label, setLabel] = useState<string>(placeholder);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkedItem = options.find((option) => option.checked) ?? null;
    const label = checkedItem?.label ?? placeholder;
    setLabel(label);
  }, [options, placeholder]);

  const handleSelectClick = () => {
    setIsOpen(true);
  };

  const handleOptionClick = (value: number, label: string) => {
    setIsOpen(false);
    onClick(value);
  };

  return (
    <div className="w-full relative">
      <button
        type="button"
        className={`relative w-full py-3 pl-3 pr-10 text-left bg-main-500 text-white font-bold rounded-md shadow-lg cursor-default focus:outline-none focus:ring-1 focus:ring-main-500 focus:border-main-500 sm:text-sm ${
          error ? "ring-error-400 ring-4" : ""
        }`}
        onClick={handleSelectClick}
      >
        <span className="flex items-center">
          <span className="block ml-3 truncate">{label}</span>
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
          <Image src="/images/select.svg" alt="select" width={20} height={20} />
        </span>
      </button>
      <div
        className={`absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {options.map((option) => (
          <CustomOption
            key={option.value}
            {...option}
            onClick={handleOptionClick}
          />
        ))}
      </div>
    </div>
  );
};
