import { Button } from '@mui/material';
import { useIntl } from 'react-intl';

export function ConnectWallet() {
  const intl = useIntl();
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      sx={(theme) => ({
        py: 2.5,
        fontWeight: 'bold',
        fontSize: theme.typography.pxToRem(20),
      })}
    >
      {intl.formatMessage({ defaultMessage: 'Connect Wallet' })}
    </Button>
  );
}
