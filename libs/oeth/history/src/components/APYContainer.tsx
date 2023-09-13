import { Divider, Stack, Typography } from '@mui/material';
import { valueFormat } from '@origin/shared/components';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';
import { useHistoryTableQuery } from '../queries.generated';

export function APYContainer() {
  const { address, isConnected } = useAccount();
  const { data } = useHistoryTableQuery(
    { addressId: address?.toLowerCase(), offset: 0 },
    {
      enabled: isConnected,
    },
  );
  const intl = useIntl();
  return (
    <Stack
      sx={{
        paddingInline: { xs: 2, md: 2.75 },
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: 1,
      }}
      direction="row"
      justifyContent="space-between"
    >
      <ValueContainer
        label={intl.formatMessage({ defaultMessage: 'OETH Balance' })}
        value={data?.addressById?.balance ?? 0}
      />
      <Divider orientation="vertical" flexItem />
      <ValueContainer
        label={intl.formatMessage({ defaultMessage: 'Pending Yield' })}
        value={0.0023}
      />
      <Divider orientation="vertical" flexItem />
      <ValueContainer
        label={intl.formatMessage({
          defaultMessage: 'Lifetime earnings (OETH)',
        })}
        value={data?.addressById?.earned ?? 0}
      />
    </Stack>
  );
}

interface Props {
  label: string;
  value: number;
}

function ValueContainer(props: Props) {
  const intl = useIntl();
  return (
    <Stack gap={0.5} sx={{ paddingBlock: 2, textAlign: 'center', flex: 1 }}>
      <Typography variant="body2" color="text.secondary">
        {props.label}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Sailec',
          fontSize: (theme) => theme.typography.pxToRem(20),
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '2rem',
          textAlign: 'center',
        }}
        color="primary.contrastText"
      >
        {intl.formatNumber(props.value, valueFormat)}
      </Typography>
    </Stack>
  );
}
