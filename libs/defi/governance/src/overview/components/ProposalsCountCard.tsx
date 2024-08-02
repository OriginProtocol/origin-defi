import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import { OgvProposalState, useHolderCountQuery } from '@origin/defi/shared';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { useProposals } from '../hooks';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const ProposalsCountCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: proposals, isLoading: isProposalsLoading } = useProposals();
  const { data: holdersCount, isLoading: isHoldersCountLoading } =
    useHolderCountQuery(
      {
        token: tokens.mainnet.xOGN.address,
        chainId: tokens.mainnet.xOGN.chainId,
      },
      { select: (data) => data?.erc20HoldersConnection?.totalCount ?? 0 },
    );

  const active =
    proposals?.filter?.((p) =>
      [OgvProposalState.Active.toLowerCase()].includes(p.status.toLowerCase()),
    )?.length ?? 0;

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Global stats' })}
      />
      <Divider />
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Proposals' })}
            value={intl.formatNumber(proposals?.length ?? 0)}
            isLoading={isProposalsLoading}
            {...valueLabelProps}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Active Proposals' })}
            value={intl.formatNumber(active)}
            isLoading={isProposalsLoading}
            {...valueLabelProps}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Registered Voters' })}
            value={intl.formatNumber(holdersCount ?? 0)}
            isLoading={isHoldersCountLoading}
            {...valueLabelProps}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  spacing: 2,
  sx: { width: 1 },
  labelProps: {
    variant: 'body3',
    fontWeight: 'medium',
    color: 'text.secondary',
  },
  valueProps: { variant: 'body3', fontWeight: 'medium' },
};
