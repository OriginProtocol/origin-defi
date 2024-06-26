import { Box, Container, Stack } from '@mui/material';

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
      sx={{
        position: 'relative',
        ...rest.sx,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -1,
          bottom: 0,
          left: -30,
          borderLeft: 'solid 30px',
          borderLeftColor: 'background.paper',
          borderTop: `solid 1px`,
          borderTopColor: `divider`,
        }}
      />
      <Container maxWidth="md" {...containerProps}>
        {children}
      </Container>
    </Stack>
  );
};
