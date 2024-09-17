import { useRef, useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { MenuItem } from '@mui/material';
import { ClickAwayMenu, LoadingLabel } from '@origin/shared/components';
import { FaChevronDownRegular } from '@origin/shared/icons';
import { formatInTimeZone } from 'date-fns-tz';
import { last, not } from 'ramda';
import { defineMessage, useIntl } from 'react-intl';

import { useTokenChartStats } from '../../hooks';
import { BarChart } from '../Charts/BarChart';
import { LimitControls } from '../LimitControls';

import type { SelectProps } from '@mui/material';
import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type ProtocolRevenueCardProps = {
  token: Token;
  width: number;
  height: number;
  from?: string;
} & CardProps;

export const ProtocolRevenueCard = ({
  token,
  width,
  height,
  from,
  ...rest
}: ProtocolRevenueCardProps) => {
  const intl = useIntl();
  const [limit, setLimit] = useState<number | undefined>(undefined);
  const [ma, setMa] = useState<MA>('feesMovingAvg30Days');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const { data: feesData, isLoading: isFeesLoading } = useTokenChartStats(
    { token, limit, from },
    { select: (data) => data.map((d) => ({ x: d.timestamp, y: d.fees })) },
  );
  const { data: feesAvgData, isLoading: isFeesAvgLoading } = useTokenChartStats(
    { token, limit, from },
    {
      select: (data) => data.map((d) => ({ x: d.timestamp, y: d?.[ma] })),
    },
  );

  const activeItem =
    hoverIdx === null ? last(feesData ?? []) : feesData?.[hoverIdx];

  return (
    <Card {...rest}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={0.5}>
            <Typography variant="featured1" sx={{ fontWeight: 'bold' }}>
              {intl.formatMessage({ defaultMessage: 'Daily protocol revenue' })}
            </Typography>
            <LoadingLabel
              isLoading={isFeesLoading || isFeesAvgLoading}
              sx={{ fontWeight: 'bold' }}
            >
              Ξ{intl.formatNumber(activeItem?.y ?? 0)}
            </LoadingLabel>
            <LoadingLabel
              isLoading={isFeesLoading || isFeesAvgLoading}
              sx={{ fontWeight: 'bold' }}
            >
              {formatInTimeZone(
                new Date(activeItem?.x ?? new Date().getTime()),
                'UTC',
                'dd/MM/yyyy',
              )}
            </LoadingLabel>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
            <MAControls ma={ma} setMa={setMa} />
          </Stack>
        </Stack>
      </CardContent>
      {isFeesLoading || isFeesAvgLoading ? (
        <Stack
          sx={{ width, height, justifyContent: 'center', alignItems: 'center' }}
        >
          <CircularProgress size={36} />
        </Stack>
      ) : (
        <BarChart
          width={width}
          height={height}
          barData={feesData ?? []}
          lineData={feesAvgData ?? []}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          tickYFormat={(value) => `Ξ ${value as number}`}
          tickXFormat={(value) =>
            formatInTimeZone(new Date(Number(value)), 'UTC', 'dd MM')
          }
        />
      )}
    </Card>
  );
};

const maOptions = {
  feesMovingAvg7Days: defineMessage({ defaultMessage: '7-Day MA' }),
  feesMovingAvg30Days: defineMessage({ defaultMessage: '30-Day MA' }),
};

type MA = keyof typeof maOptions;

type MaControlsProps = {
  ma: MA;
  setMa: (value: MA) => void;
} & SelectProps;

const MAControls = ({ ma, setMa, ...rest }: MaControlsProps) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        ref={anchorEl}
        onClick={() => {
          setOpen(not);
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <Typography>{intl.formatMessage(maOptions[ma])}</Typography>
          <FaChevronDownRegular sx={{ fontSize: 12 }} />
        </Stack>
      </Button>
      <ClickAwayMenu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        paperProps={{ sx: { p: 0 } }}
      >
        {Object.entries(maOptions).map(([avg, label]) => (
          <MenuItem
            key={avg}
            value={avg}
            onClick={() => {
              setMa(avg as keyof typeof maOptions);
              setOpen(false);
            }}
            sx={[
              (theme) => ({ typography: theme.typography.body3 }),
              ...(avg === ma ? [{ backgroundColor: 'secondary.main' }] : []),
            ]}
          >
            {intl.formatMessage(label)}
          </MenuItem>
        ))}
      </ClickAwayMenu>
    </>
  );
};
