import { forwardRef, useLayoutEffect, useRef, useState } from 'react';

import { Box, Button, Stack, Typography } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import type { ButtonProps, StackProps } from '@mui/material';
import type { ReactNode } from 'react';

export type Option = {
  label: ReactNode;
  value: string | number;
};

export type SliderSwitchProps = {
  value: string | number;
  options: Option[];
  onChange: (value: string | number) => void;
} & Omit<StackProps, 'children' | 'onClick' | 'onChange'>;

export const SliderSwitch = ({
  value,
  options,
  onChange,
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
        border: (theme) => `1px solid ${theme.palette.grey[800]}`,
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
          background: 'grey.800',
          transform: `translateX(${translateX}px)`,
          transition: '0.2s ease',
          backgroundColor: 'grey.800',
        }}
      />
    </Stack>
  );
};

type SwitchButtonProps = { option: Option; isSelected: boolean } & ButtonProps;

const SwitchButton = forwardRef<HTMLButtonElement, SwitchButtonProps>(
  ({ option, isSelected, ...rest }, ref) => {
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
          color: isSelected ? 'text.primary' : 'text.secondary',
          ...rest?.sx,
        }}
      >
        {typeof option.label === 'string' ? (
          <Typography>{option.label}</Typography>
        ) : (
          option.label
        )}
      </Button>
    );
  },
);
SwitchButton.displayName = 'SwitchButton';
