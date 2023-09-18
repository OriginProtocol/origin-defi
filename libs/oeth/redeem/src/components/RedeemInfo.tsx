import { Box, Tooltip, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import type { Theme } from '@mui/material';

export function RedeemInfo() {
  const intl = useIntl();

  return (
    <Tooltip
      title={
        <Typography color="text.secondary" variant="body2">
          {intl.formatMessage({
            defaultMessage: 'Redeem OETH for the basket of underlying assets',
          })}
        </Typography>
      }
      componentsProps={{
        tooltip: {
          sx: {
            paddingInline: 2,
            paddingBlock: 1.5,
            borderRadius: 2,
            border: '1px solid',
            borderColor: (theme) => theme.palette.grey[500],
            boxShadow: (theme: Theme) => theme.shadows[23],
          },
        },
      }}
    >
      <Box
        component="img"
        src="/images/info.svg"
        data-testid="swap-route-info"
        sx={{
          width: (theme) => theme.typography.pxToRem(12),
          height: (theme) => theme.typography.pxToRem(12),
          color: (theme) => theme.palette.text.secondary,
        }}
      ></Box>
    </Tooltip>
  );
}
