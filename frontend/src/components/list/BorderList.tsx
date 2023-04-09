interface BorderListProps {
  items: {
    key: string | number;
    value: string | number;
  }[];
  mode?: "indexTable";
}

export const BorderList = ({ items, mode }: BorderListProps) => {
  const css = mode === "indexTable" ? "grid-cols-indexTable" : "grid-cols-2";
  return (
    <dl className={`grid ${css}`}>
      {items.map((item) => (
        <>
          <dt className="border-b-2 mt-1 pr-4">{item.key}</dt>
          <dd className="border-b-2 mt-1">{item.value}</dd>
        </>
      ))}
    </dl>
  );
};
