import { Card, Divider, Tab, Tabs } from '@mui/material';
import { useIntl } from 'react-intl';

import { useOperation } from '../hooks';
import { ClaimForm } from './ClaimForm';
import { DepositForm } from './DepositForm';
import { WithdrawForm } from './WithdrawForm';

import type { TabProps } from '@mui/material';

export const OperationPanel = () => {
  const intl = useIntl();
  const { operation, update } = useOperation();

  return (
    <Card>
      <Tabs
        value={operation}
        onChange={(_, newVal) => update(newVal)}
        variant="fullWidth"
        sx={{ minHeight: 0 }}
      >
        <Tab
          label={intl.formatMessage({ defaultMessage: 'Deposit' })}
          value="deposit"
          {...tabProps}
        />
        <Tab
          label={intl.formatMessage({ defaultMessage: 'Withdraw' })}
          value="withdraw"
          {...tabProps}
        />
        <Tab
          label={intl.formatMessage({ defaultMessage: 'Claim' })}
          value="claim"
          {...tabProps}
        />
      </Tabs>
      <Divider />
      {operation === 'deposit' ? (
        <DepositForm />
      ) : operation === 'withdraw' ? (
        <WithdrawForm />
      ) : (
        <ClaimForm />
      )}
    </Card>
  );
};

const tabProps: Partial<TabProps> = {
  sx: (theme) => ({
    minHeight: 0,
    '&&&': {
      py: 2,
    },
  }),
};
