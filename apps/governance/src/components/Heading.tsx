import type { ReactNode } from 'react';

export const Heading = ({ children }: { children: ReactNode }) => (
  <div className="font-bold text-3xl sm:text-4xl leading-snug mb-6">
    {children}
  </div>
);
