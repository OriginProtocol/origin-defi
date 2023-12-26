import { Card, CardContent, Stack } from '@mui/material';
import {
  OgvProposalState,
  useHoldersCountQuery,
} from '@origin/governance/shared';
import { ValueLabel } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { useProposals } from '../hooks';

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
      ?.filter((p) =>
        [OgvProposalState.Active.toLowerCase()].includes(
          p.status.toLowerCase(),
        ),
      )
      ?.length.toString() ?? '0';

  return (
    <Card {...props}>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Proposals' })}
            value={proposals?.length ?? 0}
            isLoading={isProposalsLoading}
            labelProps={{ sx: { fontSize: 14 } }}
            {...valueLabelProps}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Active Proposals' })}
            value={active}
            isLoading={isProposalsLoading}
            labelProps={{ sx: { fontSize: 14 } }}
            {...valueLabelProps}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Registered Voters' })}
            value={holdersCount?.ogvAddressesConnection?.totalCount ?? 0}
            isLoading={isHoldersCountLoading}
            labelProps={{ sx: { fontSize: 14 } }}
            {...valueLabelProps}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
