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
      {...rest}
      sx={[
        (theme) => ({
          minHeight: `calc(100Dvh - ${theme.mixins.toolbar.height}px)`,
        }),
        showFooterMargin
          ? {
              mb: 6,
            }
          : {
              mb: 0,
            },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      {children}
    </Stack>
  );
};
