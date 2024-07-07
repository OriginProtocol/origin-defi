import { Box, SvgIcon } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import { supportedIcons } from './constants';

import type { BoxProps } from '@mui/material';

type Shape = 'circle' | 'rounded' | 'square' | 'transparent';

export type SupportedChain = keyof typeof supportedIcons;

export type NetworkIconProps = {
  chainId: SupportedChain;
  shape?: Shape;
  outlined?: boolean;
  outlineColor?: 'light' | 'dark' | string;
  size?: number;
} & Omit<BoxProps, 'children'>;

export const NetworkIcon = ({
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
  const radius = size <= 16 ? 1 : 2;

  if (shape === 'transparent') {
    return (
      <Box
        {...rest}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: size,
          height: size,
          ...('iconColor' in props &&
            !isNilOrEmpty(props.iconColor) && { color: props.iconColor }),
          ...rest?.sx,
        }}
      >
        <SvgIcon
          component={props.icon}
          sx={{ fontSize: size }}
          inheritViewBox
        />
      </Box>
    );
  }

  return (
    <Box
      {...rest}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
        borderRadius:
          shape === 'rounded' ? radius : shape === 'circle' ? '50%' : 0,
        backgroundColor: props.backgroundColor,

        padding: 1,
        svg: {
          fontSize: size * ('sizeRatio' in props ? props.sizeRatio : 1),
          ...('iconColor' in props &&
            !isNilOrEmpty(props.iconColor) && { color: props.iconColor }),
        },
        ...(outlined && { border: '1px solid', borderColor: oc }),
        ...rest?.sx,
      }}
    >
      <SvgIcon component={props.icon} inheritViewBox />
    </Box>
  );
};
