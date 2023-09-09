import { Box, Divider, Stack, Typography } from '@mui/material';
import { valueFormat } from '@origin/shared/components';
import { theme } from '@origin/shared/theme';
import React from 'react';
import { useIntl } from 'react-intl';

export function APYContainer() {
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
        value={250.1937}
      />
      <Divider orientation="vertical" flexItem />
      <ValueContainer
        label={intl.formatMessage({ defaultMessage: 'OETH Balance' })}
        value={0.0023}
      />
      <Divider orientation="vertical" flexItem />
      <ValueContainer
        label={intl.formatMessage({
          defaultMessage: 'Lifetime earnings (OETH)',
        })}
        value={15.1937}
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
