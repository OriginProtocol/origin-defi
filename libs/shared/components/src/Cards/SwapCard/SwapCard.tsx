import { useState } from 'react';

import { Box, Stack } from '@mui/material';

import { Card } from '../Card';
import { Input } from './Input';
import { Output } from './Output';
import { SwapButton } from './SwapButton';

import type { FormatNumberOptions } from 'react-intl';

export const valueFormat: FormatNumberOptions = {
  minimumFractionDigits: 2,
};
export const currencyFormat: FormatNumberOptions = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
};
export const quantityFormat: FormatNumberOptions = {
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
};

interface Props {
  title: string | React.ReactNode;
  baseTokenName: string;
  baseTokenIcon: string | string[];
  baseTokenBalance?: number;
  baseTokenValue?: number;
  exchangeTokenName: string;
  exchangeTokenIcon: string | string[];
  exchangeTokenQuantity: number;
  exchangeTokenValue?: number;
  exchangeTokenNode?: React.ReactNode;
  exchangeTokenBalance?: number;
  isLoading?: boolean;
  onValueChange: (value: string) => void;
  onSwap: () => void;
  children?: React.ReactNode[];
}

export function SwapCard({
  title,
  baseTokenIcon,
  baseTokenName,
  exchangeTokenIcon,
  exchangeTokenNode,
  exchangeTokenName,
  baseTokenValue,
  baseTokenBalance,
  exchangeTokenQuantity,
  exchangeTokenValue,
  exchangeTokenBalance,
  onValueChange,
  onSwap,
  isLoading = false,
  children,
}: Props) {
  const [isSwapped, setSwapState] = useState(false);
  return (
    <Card title={title} sxCardTitle={{ padding: { xs: 2, md: 3 } }}>
      <Box
        sx={{
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
          position: 'relative',
        }}
      >
        <Input
          isLoading={isLoading}
          isSwapped={isSwapped}
          baseTokenIcon={baseTokenIcon}
          baseTokenName={baseTokenName}
          baseTokenValue={baseTokenValue}
          exchangeTokenNode={exchangeTokenNode}
          onValueChange={onValueChange}
          baseTokenBalance={baseTokenBalance}
        />
        <Output
          isLoading={isLoading}
          isSwapped={isSwapped}
          exchangeTokenIcon={exchangeTokenIcon}
          exchangeTokenName={exchangeTokenName}
          exchangeTokenQuantity={exchangeTokenQuantity}
          exchangeTokenValue={exchangeTokenValue}
          exchangeTokenNode={exchangeTokenNode}
          exchangeTokenBalance={exchangeTokenBalance}
        />
        <SwapButton
          onClick={() => {
            setSwapState((prev) => !prev);
            onSwap();
          }}
        />
      </Box>

      <Stack gap={2} sx={{ mt: 2 }}>
        {children}
      </Stack>
    </Card>
  );
}
