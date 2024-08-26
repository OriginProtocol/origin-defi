export const hasKey = <O extends object>(
  obj: O,
  key: PropertyKey,
): key is keyof O => {
  return key in obj;
};

export const isInArray = <T>(element: T, array: readonly T[]): boolean => {
  return array.includes(element);
};
