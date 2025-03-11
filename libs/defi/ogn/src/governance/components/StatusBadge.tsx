import { alpha, Skeleton, Typography, useTheme } from '@mui/material';
import { ColorChip, OgvProposalState } from '@origin/defi/shared';
import {
  Active,
  Ban,
  FaArrowDownRegular,
  FaCircleXmarkRegular,
  FaClockRegular,
  FaGearComplexRegular,
  FaXmarkRegular,
  Loader,
  Succeeded,
} from '@origin/shared/icons';
import { defineMessage, useIntl } from 'react-intl';

import { statusLabels } from '../constants';

import type { StackProps } from '@mui/material';

export type StatusBadgeProps = {
  status: string | undefined | null;
  isLoading?: boolean;
} & StackProps;

export const StatusBadge = ({
  status,
  isLoading,
  ...rest
}: StatusBadgeProps) => {
  const intl = useIntl();
  const theme = useTheme();

  const label =
    statusLabels[status ?? ''] ?? defineMessage({ defaultMessage: 'Unknown' });
  const color =
    {
      [OgvProposalState.Active.toLowerCase()]: theme.palette.primary.main,
      [OgvProposalState.Canceled.toLowerCase()]: theme.palette.text.primary,
      [OgvProposalState.Defeated.toLowerCase()]: theme.palette.error.main,
      [OgvProposalState.Executed.toLowerCase()]: theme.palette.success.main,
      [OgvProposalState.Expired.toLowerCase()]: theme.palette.text.primary,
      [OgvProposalState.Pending.toLowerCase()]: theme.palette.primary.main,
      [OgvProposalState.Queued.toLowerCase()]: theme.palette.primary.main,
      [OgvProposalState.Succeeded.toLowerCase()]: theme.palette.success.main,
      closed: theme.palette.text.primary,
      pending: theme.palette.primary.main,
    }[status?.toLowerCase() ?? ''] ?? theme.palette.text.secondary;
  const icon = {
    [OgvProposalState.Active.toLowerCase()]: (
      <Active sx={{ fontSize: 14, color: 'inherit' }} />
    ),
    [OgvProposalState.Canceled.toLowerCase()]: (
      <FaCircleXmarkRegular sx={{ fontSize: 14, color: 'inherit' }} />
    ),
    [OgvProposalState.Defeated.toLowerCase()]: (
      <Ban sx={{ fontSize: 14, color: 'inherit' }} />
    ),
    [OgvProposalState.Executed.toLowerCase()]: (
      <FaGearComplexRegular sx={{ fontSize: 14, color: 'inherit' }} />
    ),
    [OgvProposalState.Expired.toLowerCase()]: (
      <FaClockRegular sx={{ fontSize: 14, color: 'inherit' }} />
    ),
    [OgvProposalState.Pending.toLowerCase()]: (
      <Loader sx={{ fontSize: 14, color: 'inherit' }} />
    ),
    [OgvProposalState.Queued.toLowerCase()]: (
      <FaArrowDownRegular sx={{ fontSize: 14, color: 'inherit' }} />
    ),
    [OgvProposalState.Succeeded.toLowerCase()]: (
      <Succeeded sx={{ fontSize: 14, color: 'inherit' }} />
    ),
    closed: <FaXmarkRegular sx={{ fontSize: 14, color: 'inherit' }} />,
    pending: <Loader sx={{ fontSize: 14, color: 'inherit' }} />,
  }[status?.toLowerCase() ?? ''];

  return (
    <ColorChip
      spacing={0.5}
      {...rest}
      sx={[
        {
          backgroundColor: alpha(color, 0.07),
          px: 1,
          py: 0.5,
          color,
          borderRadius: 1,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      {icon}
      <Typography
        variant="caption1"
        sx={{
          color: 'inherit',
        }}
      >
        {isLoading ? <Skeleton width={60} /> : intl.formatMessage(label)}
      </Typography>
    </ColorChip>
  );
};
