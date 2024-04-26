import { alpha, Stack, Typography } from '@mui/material';

import { TokenIcon } from '../Icons';

import type { StackProps, SxProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type TokenButtonProps = {
  token: Token;
  active?: boolean;
  disabled?: boolean;
  size: 'sm' | 'md';
} & StackProps;

const sizeProps: Record<TokenButtonProps['size'], SxProps> = {
  sm: {
    paddingLeft: 0.25,
    paddingRight: 1.5,
    paddingY: 0.25,
  },
  md: {
    paddingLeft: 0.75,
    paddingRight: 2,
    paddingY: 5 / 8, // 5px
  },
};

export const TokenButton = ({
  token,
  active,
  disabled,
  size = 'sm',
  ...rest
}: TokenButtonProps) => {
  return (
    <Stack
      direction="row"
      role="button"
      gap={1}
      {...rest}
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 32,
        borderRadius: 25,
        fontSize: 16,
        border: (theme) =>
          active
            ? `1px solid ${theme.palette.primary.main}`
            : '1px solid transparent',
        background: (theme) => alpha(theme.palette.common.white, 0.1),
        fontStyle: 'normal',
        cursor: disabled ? 'default' : 'pointer',
        fontWeight: 500,
        boxSizing: 'border-box',
        position: 'relative',
        ...sizeProps[size],
        ...rest?.sx,
        ...(!disabled && {
          ':hover': {
            ...(rest.sx as any)?.[':hover'],
            background: (theme) =>
              `linear-gradient(${theme.palette.grey[600]}, ${
                theme.palette.grey[600]
              }) padding-box, linear-gradient(90deg, ${alpha(
                theme.palette.primary.main,
                0.4,
              )} 0%, ${alpha(theme.palette.primary.dark, 0.4)} 100%) border-box;`,
          },
        }),
      }}
    >
      <TokenIcon token={token} sx={{ width: '1.75rem', height: 'auto' }} />
      <Typography variant="inherit">{token.symbol}</Typography>
    </Stack>
  );
};
