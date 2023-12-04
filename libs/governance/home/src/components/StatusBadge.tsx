import { Typography, useTheme } from '@mui/material';
import { OgvProposalState } from '@origin/governance/shared';
import { useIntl } from 'react-intl';

import type { TypographyProps } from '@mui/material';

import type { Proposal } from '../types';

export type StatusBadgeProps = { proposal: Proposal } & TypographyProps;

export const StatusBadge = ({ proposal, ...rest }: StatusBadgeProps) => {
  const intl = useIntl();
  const theme = useTheme();

  const label = {
    [OgvProposalState.Active]: intl.formatMessage({ defaultMessage: 'Active' }),
    [OgvProposalState.Canceled]: intl.formatMessage({
      defaultMessage: 'Canceled',
    }),
    [OgvProposalState.Defeated]: intl.formatMessage({
      defaultMessage: 'Defeated',
    }),
    [OgvProposalState.Executed]: intl.formatMessage({
      defaultMessage: 'Executed',
    }),
    [OgvProposalState.Expired]: intl.formatMessage({
      defaultMessage: 'Expired',
    }),
    [OgvProposalState.Pending]: intl.formatMessage({
      defaultMessage: 'Pending',
    }),
    [OgvProposalState.Queued]: intl.formatMessage({ defaultMessage: 'Queued' }),
    [OgvProposalState.Succeeded]: intl.formatMessage({
      defaultMessage: 'Succeeded',
    }),
  }[proposal.status];
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
      {label}
    </Typography>
  );
};
