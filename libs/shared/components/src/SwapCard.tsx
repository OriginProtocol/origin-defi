import {
  Box,
  IconButton,
  InputBase,
  Typography,
  debounce,
} from '@mui/material';
import { Card, cardStyles } from './Card';
import { SwapItem } from './SwapItem';
import { useState } from 'react';

interface Props {
  title: string | React.ReactNode;
  baseTokenName: string;
  baseTokenIcon: string;
  baseTokenValue: string;
  exchangeTokenName: string;
  exchangeTokenIcon: string;
  exchangeTokenQuantity: string;
  exchangeTokenValue: string;
  exchangeTokenNode?: React.ReactNode;
  onValueChange: (value: string) => void;
  onSwap: () => void;
}

export function SwapCard({
  title,
  baseTokenIcon,
  baseTokenName,
  exchangeTokenIcon,
  exchangeTokenNode,
  exchangeTokenName,
  baseTokenValue,
  exchangeTokenQuantity,
  exchangeTokenValue,
  onValueChange,
  onSwap,
}: Props) {
  const [isSwapped, setSwapState] = useState(false);
  return (
    <Card title={title} sxCardContent={{ padding: 0, position: 'relative' }}>
      <Box
        sx={{
          backgroundColor: 'grey.900',
          ...cardStyles,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '80% 1fr',
            alignContent: 'center',
            gap: 1,
          }}
        >
          <Box sx={{ width: '100%' }}>
            <InputBase
              placeholder="0.00"
              type="numeric"
              fullWidth
              sx={{
                border: 'none',
                backgroundColor: 'transparent',
                borderRadius: 0,
                paddingInline: 0,
                paddingBlock: 1,
                fontSize: '2.5rem',
                color: 'primary.contrastText',
              }}
              onChange={debounce((e) => onValueChange(e.target.value), 350)}
            />

            <Typography sx={{ fontSize: '1.25rem' }}>
              {baseTokenValue}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              alignItems: 'center',
              justifyContent: 'right',
            }}
          >
            <SwapItem
              name={baseTokenName}
              icon={baseTokenIcon}
              {...(isSwapped ? { additionalNode: exchangeTokenNode } : {})}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ ...cardStyles }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '80% 1fr',
            alignContent: 'center',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{
                fontSize: '2.5rem',
                color:
                  parseInt(exchangeTokenQuantity) === 0
                    ? 'text.main'
                    : 'primary.contrastText',
              }}
            >
              {exchangeTokenQuantity}
            </Typography>
            <Typography sx={{ fontSize: '1.25rem' }}>
              {exchangeTokenValue}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              alignItems: 'center',
              justifyContent: 'right',
            }}
          >
            <SwapItem
              name={exchangeTokenName}
              icon={exchangeTokenIcon}
              {...(!isSwapped ? { additionalNode: exchangeTokenNode } : {})}
            />
          </Box>
        </Box>
      </Box>
      <IconButton
        onClick={() => {
          setSwapState((prev) => !prev);
          onSwap();
        }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 'auto',
          zIndex: 2,
          width: '3rem',
          height: '3rem',
          transform: 'translateY(-12%)',
          backgroundColor: (theme) => theme.palette.divider,
          '&:hover': {
            // TODO check this color to come from the theme
            backgroundColor: 'rgba(0, 0, 0, 0.667)',
          },
        }}
      >
        <img src="https://app.oeth.com/images/splitarrow.svg" />
      </IconButton>
    </Card>
  );
}
