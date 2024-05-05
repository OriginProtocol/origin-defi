import { alpha, Skeleton, Typography, useTheme } from '@mui/material';
import { ColorChip } from '@origin/defi/shared';
import { OgvProposalState } from '@origin/governance/shared';
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
      [OgvProposalState.Active.toLowerCase()]: theme.palette.primary.light,
      [OgvProposalState.Canceled.toLowerCase()]: theme.palette.text.secondary,
      [OgvProposalState.Defeated.toLowerCase()]: theme.palette.error.main,
      [OgvProposalState.Executed.toLowerCase()]: theme.palette.success.main,
      [OgvProposalState.Expired.toLowerCase()]: theme.palette.text.secondary,
      [OgvProposalState.Pending.toLowerCase()]: theme.palette.text.secondary,
      [OgvProposalState.Queued.toLowerCase()]: theme.palette.text.secondary,
      [OgvProposalState.Succeeded.toLowerCase()]: theme.palette.success.main,
      closed: theme.palette.success.main,
      pending: theme.palette.info.main,
    }[status?.toLowerCase() ?? ''] ?? theme.palette.grey[600];

  return (
    <ColorChip bgcolor={alpha(color, 0.2)} px={1} py={0.5} {...rest}>
      <Typography variant="caption1" sx={{ color }}>
        {isLoading ? <Skeleton width={60} /> : intl.formatMessage(label)}
      </Typography>
    </ColorChip>
  );
};
