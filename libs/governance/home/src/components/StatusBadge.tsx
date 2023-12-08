import { Typography, useTheme } from '@mui/material';
import { OgvProposalState } from '@origin/governance/shared';
import { useIntl } from 'react-intl';

import { statusLabels } from '../constants';

import type { TypographyProps } from '@mui/material';

import type { Proposal } from '../types';

export type StatusBadgeProps = { proposal: Proposal } & TypographyProps;

export const StatusBadge = ({ proposal, ...rest }: StatusBadgeProps) => {
  const intl = useIntl();
  const theme = useTheme();

  const label = statusLabels[proposal.status];
  const color = {
    [OgvProposalState.Active]: theme.palette.secondary.main,
    [OgvProposalState.Canceled]: theme.palette.text.secondary,
    [OgvProposalState.Defeated]: theme.palette.error.main,
    [OgvProposalState.Executed]: theme.palette.success.main,
    [OgvProposalState.Expired]: theme.palette.text.secondary,
    [OgvProposalState.Pending]: theme.palette.text.secondary,
    [OgvProposalState.Queued]: theme.palette.text.secondary,
    [OgvProposalState.Succeeded]: theme.palette.success.main,
  }[proposal.status];

  return (
    <Typography
      {...rest}
      sx={{
        color,
        border: `1px solid ${color}`,
        px: 0.75,
        py: 0.2,
        fontWeight: 500,
        borderRadius: 2,
        ...rest?.sx,
      }}
    >
      {intl.formatMessage(label)}
    </Typography>
  );
};
