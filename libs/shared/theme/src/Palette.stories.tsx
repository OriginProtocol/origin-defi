import { Box, capitalize, Stack, Typography, useTheme } from '@mui/material';

import type {
  BoxProps,
  Palette,
  SimplePaletteColorOptions,
  StackProps,
} from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const isColor = (value: unknown) =>
  typeof value === 'string' && value.match(/^(#|rgba?)/);

const isGradient = (value: unknown) =>
  typeof value === 'string' && value.match(/^linear-gradient/);

const meta: Meta = {
  title: 'Origin Theme/Palette',
};

export interface PaletteViewProps extends StackProps {
  palette: Palette;
}

interface PaletteElemProps extends BoxProps {
  keyStr: string;
  value: string | number;
  contrastBkg?: string;
}

const PaletteElem = ({
  keyStr,
  value,
  contrastBkg,
  ...rest
}: PaletteElemProps) => {
  const theme = useTheme();
  const bkgColor = contrastBkg
    ? contrastBkg
    : isColor(value) || isGradient(value)
    ? value
    : '#FFF';
  let valueStr = ['string', 'number'].includes(typeof value) ? value : '';
  if (
    typeof value === 'number' ||
    typeof value === 'function' ||
    keyStr.endsWith('Channel')
  )
    return <></>;
  if (value.split(' ').length === 3)
    valueStr = `rbg(${value.split(' ').join(',')})`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column-reverse',
        width: 160,
        minHeight: 180,
        boxShadow: theme.shadows[1],
        ...(isColor(bkgColor) && { bgcolor: bkgColor }),
        ...(isGradient(bkgColor) && { backgroundImage: bkgColor }),
      }}
      {...rest}
    >
      <Box
        sx={{
          p: 1,
          bgcolor: 'background.grey800',
          width: '100%',
          height: 60,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography sx={{ fontWeight: 500, color: 'primary.contrastText' }}>
          {keyStr}
        </Typography>
        <Typography
          noWrap
          sx={{
            fontSize: 13,
            lineHeight: '19px',
            color: 'primary.contrastText',
          }}
        >
          {valueStr}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {contrastBkg && (
          <Typography
            sx={{
              color: value,
              fontSize: 48,
              lineHeight: '69px',
              fontWeight: 500,
            }}
          >
            T
          </Typography>
        )}
        {/* {!value && <></>} */}
        {!isColor(value) && !isGradient(value) && (
          <Typography sx={{ fontWeight: 500 }}>
            {capitalize(typeof value)} value
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const PaletteView = ({ palette, ...rest }: PaletteViewProps) => (
  <Stack direction="row" spacing={2} {...rest}>
    {Object.keys(palette)
      .filter(
        (key) =>
          ![
            'mode',
            'contrastThreshold',
            'getContrastText',
            'augmentColor',
            'tonalOffset',
            'Alert',
            'AppBar',
            'Avatar',
            'Button',
            'Chip',
            'FilledInput',
            'LinearProgress',
            'Skeleton',
            'Slider',
            'SnackbarContent',
            'SpeedDialAction',
            'StepConnector',
            'StepContent',
            'Switch',
            'TableCell',
            'Tooltip',
            'dividerChannel',
            'colorScheme',
          ].includes(key),
      )
      .map((key: string) => (
        <Stack key={key} spacing={2} direction="column" sx={{ minWidth: 160 }}>
          <Typography
            noWrap
            sx={{
              fontSize: 20,
              lineHeight: '29px',
              fontWeight: 500,
              color: 'primary.contrastText',
            }}
          >
            {capitalize(key)}
          </Typography>
          {/* eslint-disable @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {typeof palette[key] === 'object' ? (
            // @ts-ignore
            Object.keys(palette[key]).map((k) => (
              <PaletteElem
                key={`${key}-${k}`}
                keyStr={k}
                // @ts-ignore
                value={palette[key][k]}
                {...(k === 'contrastText' && {
                  // @ts-ignore
                  contrastBkg: (palette[key] as SimplePaletteColorOptions).main,
                })}
              />
            ))
          ) : (
            // @ts-ignore
            <PaletteElem keyStr={key} value={palette[key]} />
          )}
          {/* eslint-enable @typescript-eslint/ban-ts-comment */}
        </Stack>
      ))}
  </Stack>
);

export default meta;

const Container = () => {
  const { palette } = useTheme();
  return <PaletteView palette={palette} />;
};

export const Default: StoryObj = {
  render: (args) => <Container {...args} />,
  args: { defaultMode: 'dark' },
};
