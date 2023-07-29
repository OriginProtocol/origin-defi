import { Box, Button, InputBase, Typography } from '@mui/material';
import { Card, cardStyles } from './Card';
import { SwapItem } from './SwapItem';

interface Props {
  title: string | React.ReactNode;
  baseTokenName: string;
  baseTokenIcon: string;
  exchangeTokenName: string;
  exchangeTokenIcon: string;
  exchangeTokenNode?: React.ReactNode;
}

export function SwapCard({ title, baseTokenIcon, baseTokenName, exchangeTokenIcon, exchangeTokenNode, exchangeTokenName }: Props) {
//   TODO swap logic
    return (
    <Card title={title} sxCardContent={{ padding: 0 }}>
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
            {/* TODO on change handler */}
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
            />
            {/* TODO value should a prop */}
            <Typography sx={{ fontSize: '1.25rem', color: 'primary.main' }}>
              $0.00
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              alignItems: 'center',
              justifyContent: 'right',
            }}
          >
            <SwapItem name={baseTokenName} icon={baseTokenIcon} />
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
            // TODO color grey when 0 and white when value is selected
              sx={{ fontSize: '2.5rem', color: 'primary.contrastText' }}
            >
                {/* TODO value should be a prop */}
              0.00
            </Typography>
            <Typography sx={{ fontSize: '1.25rem', color: 'primary.main' }}>
                {/* TODO value should be a prop */}
              $0.00
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              alignItems: 'center',
              justifyContent: 'right',
            }}
          >
            <SwapItem name={exchangeTokenName} icon={exchangeTokenIcon} />
          </Box>
        </Box>
      </Box>
      {/* TODO swap button */}
      {/* <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -24%)',
          zIndex: 2,
          p: 3,
          backgroundColor: (theme) => theme.palette.divider,
        }}
      >
        <img src="https://app.oeth.com/images/splitarrow.svg" />
      </IconButton> */}
    </Card>
  );
}
