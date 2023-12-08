import { Card, CardContent, Stack } from '@mui/material';
import { OgvProposalState } from '@origin/governance/shared';
import { ValueLabel } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { useProposalsCountQuery } from '../queries.generated';

import type { CardProps } from '@mui/material';

const valueLabelProps = {
  valueProps: { variant: 'h3' },
  spacing: 1.5,
  sx: { width: 1, alignItems: 'flex-start' },
} as const;

export const ProposalsSummaryCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: all, isLoading: isAllLoading } = useProposalsCountQuery();
  const { data: active, isLoading: isActiveLoading } = useProposalsCountQuery({
    status: OgvProposalState.Active,
  });

  return (
    <Card {...props}>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Proposals' })}
            value={all?.ogvProposalsConnection?.totalCount?.toString() ?? '0'}
            isLoading={isAllLoading}
            {...valueLabelProps}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Active Proposals' })}
            value={
              active?.ogvProposalsConnection?.totalCount?.toString() ?? '0'
            }
            isLoading={isActiveLoading}
            {...valueLabelProps}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Registered Voters' })}
            value={'1325'}
            {...valueLabelProps}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
