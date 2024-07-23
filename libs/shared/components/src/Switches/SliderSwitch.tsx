import { forwardRef, useLayoutEffect, useRef, useState } from 'react';

import { Box, Button, emphasize, Stack, Typography } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import type { BoxProps, ButtonProps, StackProps } from '@mui/material';
import type { ReactNode } from 'react';

export type Option = {
  label: ReactNode;
  value: string | number;
};

export type SliderSwitchProps = {
  value: string | number;
  options: Option[];
  onChange: (value: string | number) => void;
  selectedSx?: BoxProps['sx'];
} & Omit<StackProps, 'children' | 'onClick' | 'onChange'>;

export const SliderSwitch = ({
  value,
  options,
  onChange,
  selectedSx,
  ...rest
}: SliderSwitchProps) => {
  const refs = useRef<HTMLButtonElement[]>([]);
  const [itemsWidth, setItemsWidth] = useState<number[]>([]);

  useLayoutEffect(() => {
    setItemsWidth(refs.current.map((o) => o.offsetWidth));
  }, []);

  const idx = options.findIndex((o) =>
    isNilOrEmpty(o.value) ? isNilOrEmpty(value) : o.value === value,
  );
  const translateX = itemsWidth.reduce(
    (acc, curr, i) => (i < idx ? acc + curr : acc),
    0,
  );

  return (
    <Stack
      direction="row"
      {...rest}
      sx={{
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 6,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ...rest?.sx,
      }}
    >
      {options.map((o, i) => (
        <SwitchButton
          key={o.value}
          ref={(el) => {
            if (el) {
              refs.current[i] = el;
            }
          }}
          option={o}
          isSelected={value === o.value}
          onClick={() => {
            onChange(o.value);
          }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          textColor={value === o.value ? (selectedSx as any)?.color : null}
        />
      ))}
      <Box
        sx={{
          position: 'absolute',
          borderRadius: 6,
          zIndex: 1,
          top: 0,
          left: 0,
          width: itemsWidth[idx],
          height: 1,
          transform: `translateX(${translateX}px)`,
          transition: '0.2s ease',
          backgroundColor: (theme) =>
            emphasize(theme.palette.background.paper, 0.2),
          ...selectedSx,
        }}
      />
    </Stack>
  );
};

type SwitchButtonProps = {
  option: Option;
  isSelected: boolean;
  textColor?: string;
} & ButtonProps;

const SwitchButton = forwardRef<HTMLButtonElement, SwitchButtonProps>(
  ({ option, isSelected, textColor, ...rest }, ref) => {
    return (
      <Button
        variant="text"
        {...rest}
        ref={ref}
        sx={{
          typography: 'body2',
          px: 2,
          py: 1,
          zIndex: 2,
          color: isSelected ? (textColor ?? 'text.primary') : 'text.secondary',
          transition: 'color 0.2s ease',
          ':hover': {
            backgroundColor: 'transparent',
            '.label': { color: textColor ?? 'text.primary' },
          },
          ...rest?.sx,
        }}
      >
        {typeof option.label === 'string' ? (
          <Typography className="label">{option.label}</Typography>
        ) : (
          option.label
        )}
      </Button>
    );
  },
);
SwitchButton.displayName = 'SwitchButton';
