import { Box, SvgIcon } from '@mui/material';
import { hasKey, isNilOrEmpty } from '@origin/shared/utils';

import mainnetMulti from './components/mainnet_multi.svg?react';
import { supportedIcons } from './constants';

import type { BoxProps } from '@mui/material';
type Shape = 'circle' | 'rounded' | 'square' | 'transparent';

export type SupportedChain = keyof typeof supportedIcons | number;

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
  const props = hasKey(supportedIcons, chainId)
    ? supportedIcons[chainId]
    : {
        icon: mainnetMulti,
        sizeRatio: 0.75,
        backgroundColor: '#D9EAFF',
      };
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
        sx={[
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: size,
            height: size,
            ...rest?.sx,
          },
          'iconColor' in props &&
            !isNilOrEmpty(props.iconColor) && { color: props.iconColor },
        ]}
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
      sx={[
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: size,
          height: size,
          backgroundColor: props.backgroundColor,
          padding: 1,
          ...rest?.sx,
        },
        shape === 'rounded'
          ? {
              borderRadius: radius,
            }
          : {
              borderRadius: shape === 'circle' ? '50%' : 0,
            },
        'iconColor' in props &&
          !isNilOrEmpty(props.iconColor) && {
            svg: { color: props.iconColor },
          },
        outlined && { border: '1px solid', borderColor: oc },
      ]}
    >
      <SvgIcon component={props.icon} inheritViewBox />
    </Box>
  );
};
