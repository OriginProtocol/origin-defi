import { Container, Stack } from '@mui/material';

import type { ContainerProps, StackProps } from '@mui/material';

export type PageSectionProps = {
  containerProps?: ContainerProps;
  hideVerticalPadding?: boolean;
} & StackProps;

export const PageSection = ({
  containerProps,
  hideVerticalPadding,
  children,
  ...rest
}: PageSectionProps) => {
  return (
    <Stack
      bgcolor="background.paper"
      py={hideVerticalPadding ? 0 : 6}
      flexGrow={1}
      {...rest}
    >
      <Container maxWidth="md" {...containerProps}>
        {children}
      </Container>
    </Stack>
  );
};
