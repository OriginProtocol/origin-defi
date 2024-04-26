import { Stack } from '@mui/material';

import type { StackProps } from '@mui/material';

export type PageProps = {
  showFooterMargin?: boolean;
} & StackProps;

export const Page = ({ children, showFooterMargin, ...rest }: PageProps) => {
  return (
    <Stack mb={showFooterMargin ? 6 : 0} {...rest}>
      {children}
    </Stack>
  );
};
