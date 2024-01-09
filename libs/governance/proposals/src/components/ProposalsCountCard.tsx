import { Card, CardContent, Stack } from '@mui/material';
import {
  OgvProposalState,
  useHoldersCountQuery,
} from '@origin/governance/shared';
import { ValueLabel } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { useProposals } from '../hooks';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const ProposalsCountCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: proposals, isLoading: isProposalsLoading } = useProposals();
  const { data: holdersCount, isLoading: isHoldersCountLoading } =
    useHoldersCountQuery();

  const active =
    proposals?.filter((p) =>
      [OgvProposalState.Active.toLowerCase()].includes(p.status.toLowerCase()),
    )?.length ?? 0;

  return (
    <Card {...props}>
      <CardContent>
        <Stack direction="row" spacing={2}>
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
            value={intl.formatNumber(
              holdersCount?.ogvAddressesConnection?.totalCount ?? 0,
            )}
            isLoading={isHoldersCountLoading}
            {...valueLabelProps}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  labelProps: {
    sx: { fontSize: (theme) => theme.typography.body1.fontSize, flexGrow: 1 },
  },
  valueProps: { variant: 'h3' },
  spacing: 1.5,
  sx: { width: 1, alignItems: 'flex-start' },
};
