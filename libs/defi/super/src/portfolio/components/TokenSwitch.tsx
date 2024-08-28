import { Stack } from '@mui/material';
import { SliderSwitch } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';

import { useTokenSelect } from '../hooks';

import type { StackProps } from '@mui/material';
import type { Option } from '@origin/shared/components';

export const TokenSwitch = (props: StackProps) => {
  const { symbol, update } = useTokenSelect();

  const handleChange = (newVal: string | number) => {
    update(newVal as 'superOETHb' | 'wsuperOETHb');
  };

  const options: Option[] = [
    {
      label: tokens.base.superOETHb.symbol,
      value: tokens.base.superOETHb.symbol,
    },
    {
      label: tokens.base.wsuperOETHb.symbol,
      value: tokens.base.wsuperOETHb.symbol,
    },
  ];

  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <SliderSwitch
        options={options}
        value={symbol}
        onChange={handleChange}
        sx={{ borderRadius: 2, backgroundColor: 'background.default' }}
        selectedSx={{
          borderRadius: 2,
          color: 'primary.contrastText',
          backgroundColor: 'primary.main',
          boxShadow: (theme) =>
            `inset 0 0 0 1px ${theme.palette.background.default}`,
        }}
      />
    </Stack>
  );
};
