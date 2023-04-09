export const fetcher = async <T>(resource: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${resource}`,
    init
    )
  return res.json();
};
