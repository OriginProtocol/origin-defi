import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { MergerBanner } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import { ArmCard, TokenCard } from './TokenCard';

import type { CardProps } from '@mui/material';

export const LSTCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card
      {...props}
      sx={[
        { backgroundColor: 'background.highlight' },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
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
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              mb: 1,
            }}
          >
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
          <Typography
            variant="caption1"
            sx={{
              mb: 3,
            }}
          >
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
            <TokenCard token={tokens.base.superOETHb} href="/super" />
            <TokenCard
              token={tokens.optimism.superOETHo}
              href="/super"
              disabled
            />
          </Stack>
        </Stack>
        <Stack
          sx={(theme) => ({
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
            overflow: 'hidden',
            background: `url('/images/circles3Pattern.svg'),${theme.palette.background.default}`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: {
              xs: 'contain, 100%',
              md: '600px 280%, 100%',
            },
            backgroundPosition: {
              xs: 'right top',
              md: 'right top',
            },
            p: 3,
            mt: 3,
          })}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              mb: 1,
            }}
          >
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
          <Typography
            variant="caption1"
            sx={{
              mb: 3,
            }}
          >
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
            <TokenCard token={tokens.mainnet.OETH} href="/oeth" />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const StakingCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card
      {...props}
      sx={[
        { backgroundColor: 'background.highlight' },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <CardContent>
        <Stack
          sx={(theme) => ({
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
            overflow: 'hidden',
            background: `url('/images/stakingPattern.svg'),${theme.palette.background.default}`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: {
              xs: 'auto 50%',
              md: 'auto 100%',
            },
            backgroundPosition: {
              xs: 'right -20px top -20px',
              md: 'right center',
            },
            p: 3,
            mb: 3,
          })}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              mb: 1,
            }}
          >
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
          <Typography
            variant="caption1"
            sx={{
              mb: 3,
            }}
          >
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
            <TokenCard
              token={tokens.mainnet.OGN}
              externalHref="https://app.uniswap.org/swap?outputCurrency=0x8207c1FfC5B6804F6024322CcF34F29c3541Ae26&chain=mainnet"
            />
          </Stack>
        </Stack>
        <MergerBanner
          endSlot={
            <Button component={RouterLink} to="/more/migration">
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
    <Card
      {...props}
      sx={[
        { backgroundColor: 'background.highlight' },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <CardContent>
        <Stack
          sx={(theme) => ({
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
            overflow: 'hidden',
            background: `url('/images/wavePattern.svg'),${theme.palette.background.default}`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: {
              xs: '80%, 100%',
              sm: '60%, 100%',
              md: 'contain, 100%',
            },
            backgroundPosition: {
              xs: 'right -40px top',
              md: 'right top',
            },
            p: 3,
          })}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              mb: 1,
            }}
          >
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
          <Typography
            variant="caption1"
            sx={{
              mb: 3,
            }}
          >
            {intl.formatMessage({
              defaultMessage: `Auto-compounding yield and diversification since Summer 2020.`,
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
            <TokenCard token={tokens.mainnet.OUSD} href="/ousd" />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const ArmVaultCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card
      {...props}
      sx={[
        { backgroundColor: 'background.highlight' },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <CardContent>
        <Stack
          sx={(theme) => ({
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
            overflow: 'hidden',
            background: `url('/images/armPattern.svg'),${theme.palette.background.default}`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: {
              xs: 'auto 200px',
              md: 'auto',
            },
            backgroundPosition: {
              xs: 'right bottom',
              md: 'right center',
            },
            p: 3,
          })}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Box
              sx={{
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                width: 10,
                height: 10,
              }}
            />
            <Typography variant="mono">
              {intl.formatMessage({ defaultMessage: 'ARM Vaults' })}
            </Typography>
          </Stack>
          <Typography
            variant="caption1"
            sx={{
              mb: 3,
            }}
          >
            {intl.formatMessage({
              defaultMessage: `Earn passively with low risk.`,
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
            <ArmCard />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
