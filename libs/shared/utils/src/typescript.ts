export const hasKey = <O extends object>(
  obj: O,
  key: PropertyKey,
): key is keyof O => {
  return key in obj;
};

export const includes = <T>(array: readonly T[], element: T): boolean => {
  return array.includes(element);
};
