import { Card, Divider, Tab, Tabs } from '@mui/material';
import { useIntl } from 'react-intl';

import { useOperation } from '../hooks';
import { ClaimForm } from './ClaimForm';
import { DepositForm } from './DepositForm';
import { WithdrawForm } from './WithdrawForm';

export const OperationPanel = () => {
  const intl = useIntl();
  const { operation, update } = useOperation();

  return (
    <Card>
      <Tabs
        value={operation}
        onChange={(_, newVal) => update(newVal)}
        variant="fullWidth"
        sx={{
          minHeight: { xs: 56, md: 72 },
          '> *': { pt: { xs: 1.25, sm: 1, md: 0 } },
        }}
      >
        <Tab
          label={intl.formatMessage({ defaultMessage: 'Deposit' })}
          value="deposit"
        />
        <Tab
          label={intl.formatMessage({ defaultMessage: 'Withdraw' })}
          value="withdraw"
        />
        <Tab
          label={intl.formatMessage({ defaultMessage: 'Claim' })}
          value="claim"
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
