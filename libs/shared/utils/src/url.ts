// Define a type for the input object
type NestedObject = {
  [key: string]: string | string[] | NestedObject | boolean;
};

// Function to convert the nested object into a flattened key-value pair object
function flattenObject(obj: NestedObject, prefix = ''): Record<string, string> {
  return Object.keys(obj).reduce((acc: Record<string, string>, k: string) => {
    const pre = prefix.length ? `${prefix}[${k}]` : k;
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      !(obj[k] instanceof Array)
    ) {
      Object.assign(acc, flattenObject(obj[k] as NestedObject, pre));
    } else {
      acc[pre] = obj[k] as string;
    }
    return acc;
  }, {});
}

export function queryStringify(obj: NestedObject): string {
  const flattened = flattenObject(obj);
  return new URLSearchParams(flattened).toString();
}
