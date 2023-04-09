import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const BasicInput = (props: Props) => {
  return (
    <div className="relative rounded-md shadow-sm w-full">
      <input
        {...props}
        type="number"
        className="block w-full px-4 py-2 pr-12 border border-gray border-gray-300 rounded-md focus:ring-main-500 focus:border-main-500"
      />
    </div>
  );
};
