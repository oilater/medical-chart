interface FilterDataProps<T> {
  target: T[] | undefined;
  keys: (keyof T)[];
}

export function filterData<T>({ target, keys }: FilterDataProps<T>) {
  if (!target) return [];

  return target.map((item) => 
    keys.reduce((acc, key) => {
      acc[key] = item[key];
      return acc;
    }, {} as Pick<T, (typeof keys)[number]>)
  );
}