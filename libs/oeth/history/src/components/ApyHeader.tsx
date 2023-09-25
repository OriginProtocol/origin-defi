import { useState } from 'react';

import {
  alpha,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Icon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { formatAmount } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount, useBalance } from 'wagmi';

import { useHistoryApyQuery, useHistoryTableQuery } from '../queries.generated';

import type { BoxProps } from '@mui/material';

const days = [7, 30];

export function ApyHeader() {
  const intl = useIntl();
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { address } = useAccount();
  const { data: oethBalance } = useBalance({
    address,
    token: tokens.mainnet.OETH.address,
    watch: true,
  });

  const { data: apy, isLoading: apyLoading } = useHistoryApyQuery();
  const { data: earnings, isLoading: earningsLoading } = useHistoryTableQuery({
    address: address?.toLowerCase(),
    offset: 0,
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{ dense: true }}
      >
        {days.map((day) => (
          <MenuItem
            divider
            key={day}
            selected={selectedPeriod === day}
            onClick={() => {
              setSelectedPeriod(day);
              setAnchorEl(null);
            }}
          >
            {intl.formatMessage(
              { defaultMessage: '{days} day trailing' },
              { days: day },
            )}
          </MenuItem>
        ))}
      </Menu>
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={{ xs: 1, md: 1.75 }}
        sx={{ width: '100%' }}
      >
        <Box
          sx={{
            paddingInline: { xs: 3, md: 2.5 },
            paddingBlock: 2,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'grey.800',
            flexBasis: {
              xs: '100%',
              md: '9.4rem',
            },
            display: 'grid',
            placeContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          <Typography
            color="text.secondary"
            variant="body2"
            alignItems="center"
          >
            {intl.formatMessage(
              { defaultMessage: '{days} day trailing APY' },
              { days: selectedPeriod },
            )}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
          >
            {apyLoading ? (
              <Skeleton width={80} height="2rem" />
            ) : (
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  fontStyle: 'normal',
                  lineHeight: '2rem',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'Sailec',
                  backgroundImage:
                    'linear-gradient(90deg, var(--mui-palette-primary-light) 0%, #6A36FC 100%)',
                }}
              >
                {intl.formatNumber(
                  selectedPeriod === 30
                    ? apy.apies[0].apy30DayAvg
                    : apy.apies[0].apy7DayAvg,
                  {
                    minimumFractionDigits: 2,
                  },
                )}
              </Typography>
            )}
            <IconButton
              disableRipple
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.common.white, 0.15),
                marginInlineStart: 1,
                alignSelf: 'center',
                position: 'relative',
                height: '1rem',
                width: '1rem',
                borderRadius: '100%',
                top: '-2px',
              }}
            >
              <Box component="img" src={`/images/downarrow.png`} />
            </IconButton>
          </Stack>
        </Box>
        <Stack
          sx={{
            paddingInline: { md: 2.75, xs: 0.5 },
            paddingBlock: 2,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'grey.800',
            flex: 1,
          }}
          direction="row"
        >
          <ValueContainer
            text={intl.formatMessage({ defaultMessage: 'OETH Balance' })}
            value={formatAmount(oethBalance?.value, oethBalance?.decimals)}
          />
          <Box
            sx={{
              flex: { xs: 0.5, md: 0.25 },
              display: 'flex',
              justifyContent: 'center',
              paddingBlock: 0.75,
            }}
          >
            <Divider orientation="vertical" sx={{ borderColor: 'grey.800' }} />
          </Box>

          <ValueContainer
            text={intl.formatMessage({ defaultMessage: 'Pending yield' })}
            value={intl.formatNumber(0, {
              minimumFractionDigits: 4,
            })}
          />
          <Box
            sx={{
              flex: { xs: 0.5, md: 0.25 },
              display: 'flex',
              justifyContent: 'center',
              paddingBlock: 0.75,
            }}
          >
            <Divider orientation="vertical" sx={{ borderColor: 'grey.800' }} />
          </Box>
          <ValueContainer
            text={intl.formatMessage({ defaultMessage: 'Lifetime earnings' })}
            value={intl.formatNumber(earnings?.addressById?.earned, {
              minimumFractionDigits: 4,
            })}
            isLoading={earningsLoading}
          />
        </Stack>
      </Stack>
    </>
  );
}

type ValueContainerProps = {
  text: string;
  value: string;
  icon?: string;
  isLoading?: boolean;
} & BoxProps;

function ValueContainer({
  text,
  value,
  icon,
  isLoading,
  ...rest
}: ValueContainerProps) {
  return (
    <Box
      {...rest}
      sx={{ flex: 1, display: 'grid', placeContent: 'center', ...rest?.sx }}
    >
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
      <Stack
        component={Typography}
        direction="row"
        alignItems="center"
        color="primary.contrastText"
        sx={{
          fontSize: { xs: '0.875rem', md: '1rem' },
          fontWeight: 'bold',
          lineHeight: { md: '1.75rem', xs: '1rem' },
          fontStyle: 'normal',
          fontFamily: 'Sailec',
          justifyContent: {
            xs: 'center',
            md: 'flex-start',
          },
        }}
      >
        {isLoading ? (
          <Skeleton width={80} />
        ) : (
          <>
            {icon ? (
              <Icon
                sx={{
                  width: '0.75rem',
                  height: '0.75rem',
                  marginInlineEnd: 0.5,
                }}
                src={icon}
              />
            ) : undefined}

            {value}
          </>
        )}
      </Stack>
    </Box>
  );
}
