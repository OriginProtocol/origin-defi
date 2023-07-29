import { Box, Typography } from '@mui/material';
import { Card, cardStyles } from './Card';

interface Props {
  title: string;
  balanceText: string;
  balanceValue: string;
  lifetimeEarningsText: string;
  lifetimeEarningsValue: string;
  pendingYieldText: string;
  pendingYieldValue: string;
  logoSrc: string;
}

export function PortfolioCard({
  title,
  balanceText,
  balanceValue,
  lifetimeEarningsText,
  lifetimeEarningsValue,
  pendingYieldText,
  pendingYieldValue,
  logoSrc,
}: Props) {
  return (
    <Card
      title={title}
      sxCardContent={{
        padding: 0,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            alignContent: 'center',

            borderColor: 'background.default',
            ...cardStyles,
          }}
        >
          <Typography color="primary">{balanceText}</Typography>
          <Typography
            color="primary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontSize: (theme) => theme.typography.pxToRem(32),
            }}
          >
            {balanceValue} <img src={logoSrc} />
          </Typography>
        </Box>
        <Box
          sx={{
            borderLeft: '1px solid',
            borderColor: 'background.default',
            '& > *': {
              height: '50%',
              ...cardStyles,
            },
          }}
        >
          <Box
            sx={{
              borderBlockEnd: '1px solid',
              borderColor: (theme) => theme.palette.divider,
            }}
          >
            <Typography color="primary">
              {lifetimeEarningsText}
              <br />
              {lifetimeEarningsValue}
            </Typography>
          </Box>
          <Box>
            <Typography color="primary">
              {pendingYieldText}
              <br />
              {pendingYieldValue}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
