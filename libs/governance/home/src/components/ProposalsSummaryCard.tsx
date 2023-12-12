import { Card, CardContent, Stack } from '@mui/material';
import { OgvProposalState } from '@origin/governance/shared';
import { ValueLabel } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { useProposals } from '../hooks';
import { useHoldersCountQuery } from '../queries.generated';

import type { CardProps } from '@mui/material';

const valueLabelProps = {
  valueProps: { variant: 'h3' },
  spacing: 1.5,
  sx: { width: 1, alignItems: 'flex-start' },
} as const;

export const ProposalsSummaryCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: proposals, isLoading: isProposalsLoading } = useProposals();
  const { data: holdersCount, isLoading: isHoldersCountLoading } =
    useHoldersCountQuery();

  const active =
    proposals
      ?.filter((p) => [OgvProposalState.Active, 'active'].includes(p.status))
      ?.length.toString() ?? '0';

  return (
    <Card {...props}>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Proposals' })}
            value={proposals?.length.toString() ?? '0'}
            isLoading={isProposalsLoading}
            {...valueLabelProps}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Active Proposals' })}
            value={active}
            isLoading={isProposalsLoading}
            {...valueLabelProps}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Registered Voters' })}
            value={
              holdersCount?.ogvAddressesConnection?.totalCount?.toString() ??
              '0'
            }
            isLoading={isHoldersCountLoading}
            {...valueLabelProps}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
