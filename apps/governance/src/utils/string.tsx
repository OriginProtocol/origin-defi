import type { ReactNode } from 'react';

export function truncateAddress(str: string): ReactNode {
  if (str.length <= 10) {
    return str;
  }

  const firstSix = str.substring(0, 6);
  const lastFour = str.substring(str.length - 4);

  return (
    <>
      {firstSix}&hellip;{lastFour}
    </>
  );
}
