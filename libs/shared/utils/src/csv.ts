import { isNilOrEmpty } from './isNilOrEmpty';

export const arrayToCsv = (rows: (string | number)[][]) => {
  if (isNilOrEmpty(rows)) {
    return '';
  }

  return rows
    .map((row) =>
      row
        .map(String)
        .map((v) => v.replaceAll('"', '""'))
        .map((v) => `"${v}"`)
        .join(','),
    )
    .join('\r\n');
};
