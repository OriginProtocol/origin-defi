export const jsonStringifyReplacer = (key, value) =>
  typeof value === 'bigint' ? value.toString() : value;
