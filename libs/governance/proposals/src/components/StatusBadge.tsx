import { Skeleton, Typography, useTheme } from '@mui/material';
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
      [OgvProposalState.Active]: theme.palette.secondary.main,
      [OgvProposalState.Canceled]: theme.palette.text.secondary,
      [OgvProposalState.Defeated]: theme.palette.error.main,
      [OgvProposalState.Executed]: theme.palette.success.main,
      [OgvProposalState.Expired]: theme.palette.text.secondary,
      [OgvProposalState.Pending]: theme.palette.text.secondary,
      [OgvProposalState.Queued]: theme.palette.text.secondary,
      [OgvProposalState.Succeeded]: theme.palette.success.main,
      closed: theme.palette.success.main,
    }[status] ?? theme.palette.grey[800];

  return (
    <Typography
      variant="body2"
      {...rest}
      sx={{
        color,
        border: `1px solid ${color}`,
        px: 0.75,
        py: 0.2,
        borderRadius: 2,
        ...rest?.sx,
      }}
    >
      {isLoading ? <Skeleton width={60} /> : intl.formatMessage(label)}
    </Typography>
  );
};
