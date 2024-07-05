import { Box, SvgIcon } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import { supportedIcons } from './constants';

import type { BoxProps } from '@mui/material';

type Shape = 'circle' | 'rounded' | 'square' | 'transparent';

export type NetworkIconProps = {
  chainId: keyof typeof supportedIcons;
  shape?: Shape;
  outlined?: boolean;
  outlineColor?: 'light' | 'dark' | string;
  size?: number;
} & Omit<BoxProps, 'children'>;

export const NetworkIconProps = ({
  chainId,
  shape = 'rounded',
  outlined = false,
  outlineColor = 'light',
  size = 24,
  ...rest
}: NetworkIconProps) => {
  const props = supportedIcons[chainId];
  const oc =
    outlineColor === 'light'
      ? '#E5E5E7'
      : outlineColor === 'dark'
        ? '#111'
        : outlineColor;

  if (shape === 'transparent') {
    return (
      <Box {...rest} sx={{ width: size, height: size }}>
        <SvgIcon component={props.icon} sx={{ fontSize: size }} />
      </Box>
    );
  }

  return (
    <Box
      {...rest}
      sx={{
        borderRadius: shape === 'rounded' ? 3 : shape === 'circle' ? '50%' : 0,
        backgroundColor: props.backgroundColor,
        width: size,
        height: size,
        padding: 1,
        svg: {
          ...('iconColor' in props &&
            !isNilOrEmpty(props.iconColor) && { color: props.iconColor }),
        },
        ...(outlined && { border: '1px solid', borderColor: oc }),
        ...rest?.sx,
      }}
    >
      <SvgIcon component={props.icon} />
    </Box>
  );
};
