import Image from "next/image";
import { ButtonHTMLAttributes, MouseEvent, useState } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const PrimaryButton = ({
  label,
  onClick,
  disabled,
  ...props
}: PrimaryButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    if (onClick) {
      await onClick(e);
    }
    setIsLoading(false);
  };

  return (
    <button
      type="button"
      className="
        py-2
        px-4
        flex
        justify-center
        items-center
        bg-main-600
        hover:bg-main-700
        disabled:bg-main-800
        focus:ring-main-500
        focus:ring-offset-main-200
        text-white
        w-full
        transition
        ease-in
        duration-200
        text-center
        text-base
        font-semibold
        shadow-md
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        rounded-lg"
      {...props}
      disabled={disabled || isLoading}
      onClick={handleClick}
    >
      {isLoading ? (
        <Image
          className="animate-spin"
          src="/images/loading.svg"
          alt="loading"
          width={20}
          height={20}
        />
      ) : (
        label
      )}
    </button>
  );
};
