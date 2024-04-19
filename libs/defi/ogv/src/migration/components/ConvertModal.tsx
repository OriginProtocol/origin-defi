import { useState } from 'react';

import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Slider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  InfoTooltipLabel,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaXmarkRegular } from '@origin/shared/icons';
import { addMonths, formatDuration } from 'date-fns';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { ogvToOgnRate } from '../constants';

import type {
  ButtonProps,
  DialogProps,
  StackProps,
  TypographyProps,
} from '@mui/material';

import type { Lockup } from '../../types';

type UserInput = {
  ogvBalance: bigint;
  ogvRewards: bigint;
  veOgvlockups: Lockup[];
};

export type ConvertModalProps = UserInput & DialogProps;

export const ConvertModal = ({
  ogvBalance,
  ogvRewards,
  veOgvlockups,
  ...rest
}: ConvertModalProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [ratio, setRatio] = useState(100);
  const [duration, setDuration] = useState(48);

  const handleRatioChange = (_: Event, newValue: number | number[]) => {
    setRatio(Number(newValue));
  };

  const handleDurationChange = (_: Event, newValue: number | number[]) => {
    setDuration(Number(newValue));
  };

  const total =
    ogvBalance +
    ogvRewards +
    veOgvlockups.reduce((acc, curr) => acc + BigInt(curr.amount), 0n);
  const converted =
    +formatUnits(total, tokens.mainnet.OGV.decimals) * ogvToOgnRate;
  const ogn = (converted * (100 - ratio)) / 100;
  const xOgn = (converted * ratio) / 100;
  const extendLockupEnd = addMonths(new Date(), duration);

  return (
    <Dialog {...rest} maxWidth="sm" fullWidth fullScreen={fullScreen}>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {intl.formatMessage({ defaultMessage: 'Convert' })}
        <IconButton
          onClick={(evt) => {
            rest?.onClose?.(evt, 'backdropClick');
          }}
        >
          <FaXmarkRegular sx={{ fontSize: 14 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack pt={3} spacing={3}>
          <Typography variant="h4">
            {intl.formatMessage({
              defaultMessage: 'Your OGV/veOGV is equivalent to',
            })}
          </Typography>
          <Stack
            {...cardStackProps}
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <TokenIcon
              token={tokens.mainnet.OGN}
              outlined
              sx={{ fontSize: 32 }}
            />
            <Typography variant="h3" fontWeight={500}>
              {intl.formatNumber(converted)}
            </Typography>
            <Typography color="text.secondary">
              {tokens.mainnet.OGN.symbol}
            </Typography>
          </Stack>
          <Stack>
            <InfoTooltipLabel
              fontWeight={700}
              mb={1.5}
              tooltipLabel={intl.formatMessage({
                defaultMessage:
                  'Choose the proportion of converted OGN you want to stake into a xOGN lockup.',
              })}
            >
              {intl.formatMessage({ defaultMessage: 'Staking Ratio' })}
            </InfoTooltipLabel>
            <Stack {...cardStackProps} useFlexGap p={0} spacing={0}>
              <Stack p={2}>
                <Typography fontSize={20} fontWeight={700} mr={1}>
                  {intl.formatNumber(ratio / 100, { style: 'percent' })}
                </Typography>
                <Box mx={1}>
                  <Slider
                    value={ratio}
                    onChange={handleRatioChange}
                    min={0}
                    max={100}
                    step={1}
                    marks={[
                      {
                        value: 0,
                        label: 0,
                      },
                      {
                        value: 25,
                        label: intl.formatMessage({ defaultMessage: '25%' }),
                      },
                      {
                        value: 50,
                        label: intl.formatMessage({ defaultMessage: '50%' }),
                      },
                      {
                        value: 75,
                        label: intl.formatMessage({ defaultMessage: '75%' }),
                      },
                      {
                        value: 100,
                        label: intl.formatMessage({ defaultMessage: '100%' }),
                      },
                    ]}
                  />
                </Box>
              </Stack>
              <Divider />
              <Stack direction="row">
                <ValueLabel
                  spacing={0}
                  label={tokens.mainnet.OGN.symbol}
                  labelProps={{ px: 2, py: 1 }}
                  value={
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      p={2}
                      bgcolor="common.black"
                      width={1}
                      sx={{ borderBottomLeftRadius: '8px' }}
                    >
                      <TokenIcon
                        token={tokens.mainnet.OGN}
                        sx={{ fontSize: 24 }}
                      />
                      <Typography {...valueProps}>
                        {intl.formatNumber(ogn)}
                      </Typography>
                    </Stack>
                  }
                  sx={{ width: 1, alignItems: 'flex-start' }}
                />
                <Divider orientation="vertical" flexItem />
                <ValueLabel
                  spacing={0}
                  label={tokens.mainnet.xOGN.symbol}
                  labelProps={{ px: 2, py: 1 }}
                  value={
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      p={2}
                      bgcolor="common.black"
                      width={1}
                      sx={{ borderBottomRightRadius: '8px' }}
                    >
                      <TokenIcon
                        token={tokens.mainnet.xOGN}
                        sx={{ fontSize: 24 }}
                      />
                      <Typography {...valueProps}>
                        {intl.formatNumber(xOgn)}
                      </Typography>
                    </Stack>
                  }
                  sx={{ width: 1, alignItems: 'flex-start' }}
                />
              </Stack>
            </Stack>
          </Stack>
          <Collapse in={xOgn > 0}>
            <InfoTooltipLabel
              fontWeight={700}
              mb={1.5}
              tooltipLabel={intl.formatMessage({
                defaultMessage:
                  'The length of time you will lock up your OGN in order to receive yield and voting power. There is no way to unstake before your withdrawal date.',
              })}
            >
              {intl.formatMessage({ defaultMessage: 'Lock-up Duration' })}
            </InfoTooltipLabel>
            <Stack {...cardStackProps} useFlexGap>
              <Stack direction="row" alignItems="center">
                <Typography fontSize={20} fontWeight={700} mr={1}>
                  {duration === 0
                    ? intl.formatMessage({ defaultMessage: '0 months' })
                    : formatDuration(
                        {
                          years: Math.floor(duration / 12),
                          months: duration % 12,
                        },
                        {
                          format: ['years', 'months'],
                        },
                      )}
                </Typography>
                <Stack spacing={0.5} flexGrow={1}>
                  <Stack direction="row" justifyContent="flex-end">
                    <Typography color="text.secondary">
                      {intl.formatMessage({
                        defaultMessage: 'Lock-up Ends:',
                      })}
                    </Typography>
                    <Typography textAlign="end" minWidth={92}>
                      {intl.formatDate(extendLockupEnd, {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Box mx={1}>
                <Slider
                  value={duration}
                  onChange={handleDurationChange}
                  min={1}
                  max={48}
                  step={1}
                  marks={[
                    {
                      value: 1,
                      label: intl.formatMessage({ defaultMessage: '1m' }),
                    },
                    {
                      value: 12,
                      label: intl.formatMessage({ defaultMessage: '1y' }),
                    },
                    {
                      value: 24,
                      label: intl.formatMessage({ defaultMessage: '2y' }),
                    },
                    {
                      value: 36,
                      label: intl.formatMessage({ defaultMessage: '3y' }),
                    },
                    {
                      value: 48,
                      label: intl.formatMessage({ defaultMessage: '4y' }),
                    },
                  ]}
                />
              </Box>
            </Stack>
            <InfoTooltipLabel
              fontWeight={700}
              mt={3}
              mb={1.5}
              tooltipLabel={intl.formatMessage({
                defaultMessage:
                  'The variable APY currently being earned on staked OGN.',
              })}
            >
              {intl.formatMessage({ defaultMessage: 'Current Staking vAPY' })}
            </InfoTooltipLabel>
            <Stack {...cardStackProps}>
              <Typography
                {...valueProps}
                sx={{
                  alignSelf: 'flex-start',
                  fontWeight: 700,
                  background: (theme) =>
                    theme.palette.background.gradientOrange,
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ~5.98%
              </Typography>
            </Stack>
          </Collapse>
        </Stack>
      </DialogContent>
      <DialogContent>
        <Button variant="action" fullWidth>
          {intl.formatMessage({ defaultMessage: 'Convert' })}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export type ConvertButtonProps = UserInput & ButtonProps;

export const ConvertButton = ({
  ogvBalance,
  ogvRewards,
  veOgvlockups,
  ...rest
}: ConvertButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        {...rest}
        onClick={(e) => {
          rest?.onClick?.(e);
          setOpen(true);
        }}
      />
      <ConvertModal
        key={open ? 'open' : 'closed'}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        ogvBalance={ogvBalance}
        ogvRewards={ogvRewards}
        veOgvlockups={veOgvlockups}
      />
    </>
  );
};

const valueProps: TypographyProps = {
  fontSize: 20,
};

const cardStackProps: StackProps = {
  p: 2,
  spacing: 1,
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 1,
  bgcolor: 'background.default',
};
