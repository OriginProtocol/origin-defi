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
      {...rest}
      sx={[
        {
          backgroundColor: 'background.paper',
          flexGrow: 1,
          position: 'relative',
        },
        hideVerticalPadding
          ? {
              py: 0,
            }
          : {
              py: 6,
            },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
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
