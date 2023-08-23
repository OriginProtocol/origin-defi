import { alpha, Box, IconButton, Stack } from '@mui/material';

import { Mix } from '../../Mix';

import type { ButtonProps, SxProps } from '@mui/material';

interface Props {
  icon: string | string[];
  name: string;
  additionalNode?: React.ReactNode;
  sx?: SxProps;
}

export function SwapItem({ icon, name, additionalNode: Component, sx }: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        width: 'fit-content',
        maxHeight: '2rem',
        borderRadius: 20,
        fontSize: '1rem',
        color: 'primary.contrastText',
        fontFamily: 'Inter',
        paddingInlineStart: 0.25,
        paddingInlineEnd: Component ? 1 : 2,
        border: '1px solid transparent',
        paddingBlock: 0.25,
        background: (theme) => alpha(theme.palette.common.white, 0.1),
        fontStyle: 'normal',
        cursor: 'pointer',
        fontWeight: 500,
        position: 'relative',
        ':hover': {
          background: (theme) =>
            `linear-gradient(#3B3C3E, #3B3C3E) padding-box, linear-gradient(90deg, ${alpha(
              theme.palette.primary.main,
              0.4,
            )} 0%, ${alpha(theme.palette.primary.dark, 0.4)} 100%) border-box;`,
        },
        ...sx,
      }}
      role="button"
    >
      {typeof icon === 'string' ? (
        <Box
          component="img"
          src={icon}
          sx={{ width: '1.75rem', height: 'auto', mr: 1 }}
        />
      ) : (
        <Mix imgSrc={icon} sx={{ mr: 1 }} />
      )}
      {name}
      {Component ? Component : undefined}
    </Stack>
  );
}

export function DropdownIcon({ sx, ...rest }: ButtonProps) {
  return (
    <IconButton
      sx={{
        ...sx,
        maxHeight: '1.375rem',
        maxWidth: '1.375rem',
        padding: 0,
        marginInlineStart: 1,
        backgroundColor: 'transparent',
      }}
      {...rest}
      disableRipple
    >
      <Box component="img" src="/images/dropdown.svg" />
    </IconButton>
  );
}
