import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { BridgeBanner, MergerBanner } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';
import { Link as RputerLink } from 'react-router-dom';

import { TokenCard } from './TokenCard';

import type { CardProps } from '@mui/material';

export const LSTCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props} sx={{ backgroundColor: 'background.highlight' }}>
      <CardContent>
        <Stack
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            color: 'primary.contrastText',
            overflow: 'hidden',
            background: `url('/images/circlesWavePattern.svg'),radial-gradient(167.75% 95.71% at 76.09% 50.05%, #1E313F 0%, #15181B 100%)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: {
              xs: '800px 100%, 100%',
              sm: '1000px 100%, 100%',
              md: '800px 100%, 100%',
            },
            backgroundPosition: 'right center',
            p: 3,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <Box
              sx={{
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                width: 10,
                height: 10,
              }}
            />
            <Typography variant="mono">
              {intl.formatMessage({ defaultMessage: 'Supercharged LSTs' })}
            </Typography>
          </Stack>
          <Typography variant="caption1" mb={3}>
            {intl.formatMessage({ defaultMessage: 'Beyond liquid staking' })}
          </Typography>
          <Stack
            divider={<Divider />}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 4,
              overflow: 'hidden',
              height: 1,
            }}
          >
            <TokenCard token={tokens.base.superOETHb} />
            <TokenCard token={tokens.optimism.superOETHo} isComingSoon />
          </Stack>
        </Stack>
        <Stack
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
            overflow: 'hidden',
            background: (theme) =>
              `url('/images/circles3Pattern.svg'),${theme.palette.background.default}`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto 100%',
            backgroundPosition: 'right center',
            p: 3,
            my: 3,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <Box
              sx={{
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                width: 10,
                height: 10,
              }}
            />
            <Typography variant="mono">
              {intl.formatMessage({ defaultMessage: 'LSTs' })}
            </Typography>
          </Stack>
          <Typography variant="caption1" mb={3}>
            {intl.formatMessage({
              defaultMessage: 'Sustainable yield with no hidden exit costs',
            })}
          </Typography>
          <Stack
            divider={<Divider flexItem />}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <TokenCard token={tokens.mainnet.OETH} hideGradient />
          </Stack>
        </Stack>
        <BridgeBanner />
      </CardContent>
    </Card>
  );
};

export const StakingCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props} sx={{ backgroundColor: 'background.highlight' }}>
      <CardContent>
        <Stack
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
            overflow: 'hidden',
            background: (theme) =>
              `url('/images/stakingPattern.svg'),${theme.palette.background.default}`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: {
              xs: '800px 100%',
              md: 'auto 100%',
            },
            backgroundPosition: {
              xs: 'right -10px top -100px',
              md: 'right center',
            },
            p: 3,
            mb: 3,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <Box
              sx={{
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                width: 10,
                height: 10,
              }}
            />
            <Typography variant="mono">
              {intl.formatMessage({ defaultMessage: 'Staking' })}
            </Typography>
          </Stack>
          <Typography variant="caption1" mb={3}>
            {intl.formatMessage({
              defaultMessage: `Stake OGN to participate in governance and earn rewards. Own a stake in the network and benefit from the growth of Origin's products.`,
            })}
          </Typography>
          <Stack
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <TokenCard token={tokens.mainnet.OGN} hideGradient />
          </Stack>
        </Stack>
        <MergerBanner
          endSlot={
            <Button component={RputerLink} to="/more/migration">
              {intl.formatMessage({ defaultMessage: 'Convert' })}
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
};

export const StableCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props} sx={{ backgroundColor: 'background.highlight' }}>
      <CardContent>
        <Stack
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
            overflow: 'hidden',
            background: (theme) =>
              `url('/images/wavePattern.svg'),${theme.palette.background.default}`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: { xs: '300px', md: 'cover 100%' },
            backgroundPosition: 'right top',
            p: 3,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <Box
              sx={{
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                width: 10,
                height: 10,
              }}
            />
            <Typography variant="mono">
              {intl.formatMessage({ defaultMessage: 'Stablecoins' })}
            </Typography>
          </Stack>
          <Typography variant="caption1" mb={3}>
            {intl.formatMessage({
              defaultMessage: `Short description.`,
            })}
          </Typography>
          <Stack
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <TokenCard token={tokens.mainnet.OUSD} hideGradient />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};