export const jsonStringifyReplacer = (key: string, value: unknown) =>
  typeof value === 'bigint' ? value.toString() : value;
