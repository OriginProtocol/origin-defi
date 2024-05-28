import { Stack } from '@mui/material';
import { useMountEffect } from '@react-hookz/web';

import type { StackProps } from '@mui/material';

export type PageProps = {
  showFooterMargin?: boolean;
} & StackProps;

export const Page = ({ children, showFooterMargin, ...rest }: PageProps) => {
  useMountEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Stack
      minHeight={(theme) => `calc(100Dvh - ${theme.mixins.toolbar.height}px)`}
      mb={showFooterMargin ? 6 : 0}
      {...rest}
    >
      {children}
    </Stack>
  );
};
