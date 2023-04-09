import { InputHTMLAttributes } from "react";

interface Props {
  suffix: string;
  options?: InputHTMLAttributes<HTMLInputElement>;
  error?: string;
}

export const SuffixInput = ({ suffix, options = {}, error }: Props) => {
  return (
    <div className="relative rounded-md shadow-sm w-full">
      <input
        {...options}
        className={`block w-full px-4 py-2 pr-12 border border-gray border-gray-300 rounded-md focus:outline-none focus:ring-2 ring-main-500 ${
          error ? "outline-error-400 outline-4" : ""
        }`}
      />
      <div className="absolute inset-y-0 right-0 flex items-center px-3">
        <span>{suffix}</span>
      </div>
    </div>
  );
};
