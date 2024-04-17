import { useMemo, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { useOgvInfo } from '@origin/defi/shared';
import {
  ExpandIcon,
  LoadingLabel,
  TablePagination,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  FaArrowRightRegular,
  FaArrowUpRightRegular,
  VeOGVOutlined,
} from '@origin/shared/icons';
import { useWatchBalance } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useMediaQuery } from '@react-hookz/web';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { formatDistanceToNowStrict } from 'date-fns';
import { not } from 'ramda';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useOgvLockupsQuery } from '../../queries.generated';
import { ConvertAllBalancesButton } from './ConvertAllBalancesModal';

import type { AccordionSummaryProps, StackProps } from '@mui/material';
import type { MouseEvent } from 'react';

import type { Lockup } from '../../types';

export const ConvertVeogvAccordion = (
  props: Omit<AccordionSummaryProps, 'children'>,
) => {
  const intl = useIntl();
  const [expanded, setExpanded] = useState(false);
  const { address } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token: tokens.mainnet.veOGV,
  });
  const { data: lockupsCount, isLoading: isLockupsCountLoading } =
    useOgvLockupsQuery(
      { address: address ?? ZERO_ADDRESS },
      {
        select: (data) => data?.ogvLockups?.length ?? 0,
        enabled: !!address,
      },
    );

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary {...props}>
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent="space-between"
          p={3}
          width={1}
        >
          <Stack direction="row" alignItems="center" spacing={3} width={0.5}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <VeOGVOutlined sx={{ fontSize: 48 }} />
              <FaArrowRightRegular />
              <TokenIcon token={tokens.mainnet.OGN} sx={{ fontSize: 48 }} />
            </Stack>
            <Stack alignItems="flex-start">
              <Typography sx={{ fontSize: 24 }}>
                {intl.formatMessage({
                  defaultMessage: 'Convert your veOGV to xOGN',
                })}
              </Typography>
              <Typography>
                {intl.formatMessage({
                  defaultMessage: 'You will receive xOGN',
                })}
              </Typography>
              <Button
                variant="text"
                onClick={() => {
                  setExpanded(not);
                }}
                disabled={isLockupsCountLoading || lockupsCount === 0}
                sx={{
                  fontSize: 14,
                  lineHeight: 1.5,
                  fontWeight: 400,
                  color: 'primary.main',
                  px: 0,
                }}
              >
                {intl.formatMessage(
                  {
                    defaultMessage: 'View all veOGV lockups {count}',
                  },
                  {
                    count: (
                      <LoadingLabel
                        isLoading={isLockupsCountLoading}
                        color="inherit"
                        sWidth={10}
                        sx={{ ml: 0.5 }}
                      >
                        ({lockupsCount})
                      </LoadingLabel>
                    ),
                  },
                )}
                &nbsp;
                <ExpandIcon isExpanded={expanded} />
              </Button>
            </Stack>
          </Stack>
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Your veOGV balance' })}
            value={
              <Stack direction="row" alignItems="center" spacing={1}>
                <TokenIcon token={tokens.mainnet.veOGV} sx={{ fontSize: 24 }} />
                <Typography sx={{ fontSize: 24 }}>
                  {intl.formatNumber(
                    +formatUnits(balance ?? 0n, tokens.mainnet.OGV.decimals),
                    { notation: 'compact', maximumSignificantDigits: 4 },
                  )}
                </Typography>
              </Stack>
            }
            isLoading={isBalanceLoading}
            labelProps={{ color: 'text.primary', textAlign: 'center' }}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              p: 2,
              borderRadius: 1,
            }}
          />
          <Stack sx={{ width: 300 }}>
            <ConvertAllBalancesButton variant="action">
              {intl.formatMessage({ defaultMessage: 'Convert All veOGV' })}
            </ConvertAllBalancesButton>
            <Button
              variant="text"
              onClick={(evt: MouseEvent<HTMLButtonElement>) => {
                evt.stopPropagation();
              }}
            >
              {intl.formatMessage({
                defaultMessage: 'Unlock your veOGV',
              })}
              &nbsp;
              <FaArrowUpRightRegular />
            </Button>
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <LockupsTable />
      </AccordionDetails>
    </Accordion>
  );
};

const columnHelper = createColumnHelper<Lockup>();

function LockupsTable(props: StackProps) {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { address } = useAccount();
  const { data: govInfo, isLoading: isGovInfoLoading } = useOgvInfo();
  const { data, isLoading } = useOgvLockupsQuery(
    { address: address ?? ZERO_ADDRESS },
    {
      select: (data) => data?.ogvLockups,
      enabled: !!address,
    },
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('amount', {
        header: intl.formatMessage({ defaultMessage: 'OGV' }),
        cell: (info) =>
          intl.formatNumber(
            +formatUnits(BigInt(info.getValue()), tokens.mainnet.OGV.decimals),
            {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            },
          ),
      }),
      ...(isSm
        ? []
        : [
            columnHelper.accessor('end', {
              header: intl.formatMessage({ defaultMessage: 'Lock-up Ends' }),
              cell: (info) =>
                intl.formatDate(info.getValue(), {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                }),
            }),
          ]),
      columnHelper.display({
        id: 'timeRemaining',
        header: intl.formatMessage({ defaultMessage: 'Time Remaining' }),
        cell: (info) =>
          formatDistanceToNowStrict(new Date(info.row.original.end), {
            unit: 'month',
            roundingMethod: 'floor',
          }),
      }),
      ...(isSm
        ? []
        : [
            columnHelper.accessor('veogv', {
              id: 'veogv',
              header: tokens.mainnet.veOGV.symbol,
              cell: (info) =>
                intl.formatNumber(
                  +formatUnits(
                    BigInt(info.getValue()),
                    tokens.mainnet.veOGV.decimals,
                  ),
                  {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  },
                ),
            }),
          ]),
      columnHelper.accessor('veogv', {
        id: 'vp',
        header: intl.formatMessage({ defaultMessage: 'Voting power' }),
        cell: (info) => (
          <LoadingLabel
            isLoading={isLoading || isGovInfoLoading}
            sWidth={50}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            {intl.formatNumber(
              +formatUnits(
                BigInt(info.getValue()) ?? 0n,
                tokens.mainnet.veOGV.decimals,
              ) /
                +formatUnits(
                  govInfo?.veOgvTotalSupply ?? 1n,
                  tokens.mainnet.veOGV.decimals,
                ),
              {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              },
            )}
          </LoadingLabel>
        ),
      }),
      columnHelper.display({
        id: 'action',
        cell: (info) => {
          return (
            <Stack
              direction="row"
              spacing={1}
              alignItems="stretch"
              justifyContent="flex-end"
            >
              <Button
                variant="outlined"
                color="secondary"
                target="_blank"
                rel="noopener noreferrer nofollow"
                href={`https://etherscan.io/tx/${
                  info.row.original?.logs?.[0]?.hash ?? ''
                }`}
                sx={{ minWidth: 0 }}
              >
                <FaArrowUpRightRegular />
              </Button>
            </Stack>
          );
        },
      }),
    ],
    [govInfo?.veOgvTotalSupply, intl, isGovInfoLoading, isLoading, isSm],
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Stack {...props}>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ width: 1 }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      width: header.getSize(),
                      textAlign: index === 0 ? 'start' : 'end',
                      color: 'text.secondary',
                    }}
                  >
                    <Typography noWrap>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    sx={{
                      textAlign: index === 0 ? 'start' : 'end',
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      {table.getPageCount() > 1 && (
        <TablePagination
          table={table}
          disableScrollToTop
          buttonsProps={{
            variant: 'contained',
            color: 'inherit',
          }}
        />
      )}
    </Stack>
  );
}
