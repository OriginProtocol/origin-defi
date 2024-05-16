import { Typography } from '@mui/material';
import { ColorChip } from '@origin/defi/shared';
import { FaLinkRegular, OGV, Snapshot } from '@origin/shared/icons';
import { defineMessage, useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';
import type { ReactNode } from 'react';
import type { MessageDescriptor } from 'react-intl';

import type { ProposalType } from '../types';

export type ProposalTypeBadgeProps = {
  type?: ProposalType;
} & StackProps;

const icons: Record<ProposalType, ReactNode> = {
  onchain: <FaLinkRegular sx={{ color: 'text.secondary', fontSize: 14 }} />,
  snapshot: <Snapshot sx={{ color: 'text.secondary', fontSize: 14 }} />,
  snapshot_legacy: <OGV sx={{ fontSize: 14 }} />,
};

const labels: Record<ProposalType, MessageDescriptor> = {
  onchain: defineMessage({ defaultMessage: 'On-chain proposal' }),
  snapshot: defineMessage({ defaultMessage: 'Snapshot proposal' }),
  snapshot_legacy: defineMessage({ defaultMessage: 'Legacy governance' }),
};

export const ProposalTypeBadge = ({
  type,
  ...rest
}: ProposalTypeBadgeProps) => {
  const intl = useIntl();

  if (!type) {
    return null;
  }

  return (
    <ColorChip px={1} py={0.5} bgcolor="secondary.main" {...rest}>
      {icons[type]}
      <Typography variant="caption1" color="text.primary">
        {intl.formatMessage(labels[type])}
      </Typography>
    </ColorChip>
  );
};
