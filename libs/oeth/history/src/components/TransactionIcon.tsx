import { Box } from '@mui/material';
import React from 'react';

type Props =
  | {
      type: 'sent' | 'received' | 'yield';
    }
  | { type: 'swap'; tokenIcon: string };

export function TransactionIcon(props: Props) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: '1.375rem', md: '2rem' },
        height: { xs: '1.375rem', md: '2rem' },
      }}
    >
      <Box
        component="img"
        src={props.type === 'yield' ? '/images/Yield.svg' : '/images/oeth.svg'}
        sx={{
          width: '100%',
          height: '100%',
        }}
      ></Box>
      <Box
        sx={{
          width: { xs: '0.75rem', md: '1rem' },
          height: { xs: '0.75rem', md: '1rem' },
          position: 'absolute',
          right: '-0.4rem',
          bottom: 0,
          zIndex: 1,
        }}
        component="img"
        src={
          props.type === 'sent'
            ? '/images/Send.svg'
            : props.type === 'received' || props.type === 'yield'
            ? '/images/Received.svg'
            : '/images/Swap.svg'
        }
      ></Box>
      {props.type === 'swap' && (
        <Box
          sx={{
            position: 'absolute',
            height: '100%',
            width: '50%',
            overflow: 'hidden',
            top: 0,
            left: 0,
          }}
        >
          <Box
            sx={{
              width: { xs: '1.375rem', md: '2rem' },
              height: { xs: '1.375rem', md: '2rem' },
            }}
            component="img"
            src={props.tokenIcon}
          ></Box>
        </Box>
      )}
    </Box>
  );
}
