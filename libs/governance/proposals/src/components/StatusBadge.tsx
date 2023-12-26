import { alpha, Skeleton, Typography, useTheme } from '@mui/material';
import { OgvProposalState } from '@origin/governance/shared';
import { defineMessage, useIntl } from 'react-intl';

import { statusLabels } from '../constants';

import type { TypographyProps } from '@mui/material';

export type StatusBadgeProps = {
  status: string;
  isLoading?: boolean;
} & TypographyProps;

export const StatusBadge = ({
  status,
  isLoading,
  ...rest
}: StatusBadgeProps) => {
  const intl = useIntl();
  const theme = useTheme();

  const label =
    statusLabels[status] ?? defineMessage({ defaultMessage: 'Unknown' });
  const color =
    {
      [OgvProposalState.Active.toLowerCase()]: theme.palette.secondary.main,
      [OgvProposalState.Canceled.toLowerCase()]: theme.palette.text.secondary,
      [OgvProposalState.Defeated.toLowerCase()]: theme.palette.error.main,
      [OgvProposalState.Executed.toLowerCase()]: theme.palette.success.main,
      [OgvProposalState.Expired.toLowerCase()]: theme.palette.text.secondary,
      [OgvProposalState.Pending.toLowerCase()]: theme.palette.text.secondary,
      [OgvProposalState.Queued.toLowerCase()]: theme.palette.text.secondary,
      [OgvProposalState.Succeeded.toLowerCase()]: theme.palette.success.main,
      closed: theme.palette.success.main,
    }[status?.toLowerCase()] ?? theme.palette.grey[600];

  return (
    <Typography
      variant="body2"
      {...rest}
      sx={{
        color,
        border: `1px solid ${alpha(color, 0.2)}`,
        px: 0.75,
        py: 0.2,
        borderRadius: 1,
        ...rest?.sx,
      }}
    >
      {isLoading ? <Skeleton width={60} /> : intl.formatMessage(label)}
    </Typography>
  );
};
