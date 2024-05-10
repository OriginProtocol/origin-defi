export const stringify = <T>(object: T) => {
  return JSON.stringify(
    object,
    (key, value) =>
      typeof value === 'bigint' ? `${value.toString()}n` : value,
    undefined,
  );
};

export const parse = <T>(object: string) => {
  return JSON.parse(object, (key, value) =>
    typeof value === 'string' && /[0-9]+n/.test(value)
      ? value.slice(0, value.length - 1)
      : value,
  ) as T;
};
