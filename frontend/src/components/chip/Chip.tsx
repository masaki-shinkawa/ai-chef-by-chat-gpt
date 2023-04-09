import Image from "next/image";

interface ChipProps {
  id: number;
  label: string;
  onClick: (id: number) => void;
}

export const Chip = ({ id, label, onClick }: ChipProps) => {
  const handleOnClick = () => onClick(id);

  return (
    <span
      className="px-4 py-2 rounded-full bg-main-500 hover:bg-main-600 focus:ring-main-400 focus:ring-offset-main-200 text-gray-100 flex items-center gap-1 font-bold"
    >
      {label}
      <button className="bg-transparent hover" onClick={handleOnClick}>
        <Image
          className="text-main-200"
          src="/images/close.svg"
          alt="close"
          width={20}
          height={20}
        />
      </button>
    </span>
  );
};
