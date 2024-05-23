import { Typography } from '@mui/material';
import { ColorChip } from '@origin/defi/shared';
import { TokenIcon } from '@origin/shared/components';
import { FaLinkRegular, Snapshot } from '@origin/shared/icons';
import { defineMessage, useIntl } from 'react-intl';

import { governanceTokens } from '../constants';

import type { StackProps } from '@mui/material';
import type { ReactNode } from 'react';
import type { MessageDescriptor } from 'react-intl';

import type { ProposalType } from '../types';

export type ProposalTypeBadgeProps = {
  type?: ProposalType;
} & StackProps;

const icons: Record<ProposalType, ReactNode> = {
  onchain: <FaLinkRegular sx={{ color: 'text.secondary', fontSize: 14 }} />,
  onchain_ogv: (
    <TokenIcon token={governanceTokens.onchain_ogv} sx={{ fontSize: 14 }} />
  ),
  snapshot: <Snapshot sx={{ color: 'text.secondary', fontSize: 14 }} />,
  snapshot_ogv: (
    <TokenIcon token={governanceTokens.snapshot_ogv} sx={{ fontSize: 14 }} />
  ),
};

const labels: Record<ProposalType, MessageDescriptor> = {
  onchain: defineMessage({ defaultMessage: 'On-chain proposal' }),
  onchain_ogv: defineMessage({ defaultMessage: 'On-chain proposal' }),
  snapshot: defineMessage({ defaultMessage: 'Snapshot proposal' }),
  snapshot_ogv: defineMessage({ defaultMessage: 'Legacy governance' }),
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
    <ColorChip px={1} py={0.5} bgcolor="background.faded" {...rest}>
      {icons[type]}
      <Typography variant="caption1" color="text.primary">
        {intl.formatMessage(labels[type])}
      </Typography>
    </ColorChip>
  );
};
