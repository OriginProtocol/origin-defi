import { Stack, Typography } from '@mui/material';
import { ColorChip } from '@origin/defi/shared';
import { TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const PageTitleSection = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack
      direction="row"
      spacing={1}
      {...props}
      sx={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          pt: 3,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <ColorChip spacing={0.5} minHeight={40}>
        <TokenIcon token={tokens.mainnet.OGN} sx={{ fontSize: 24 }} />
        <Typography variant="body2" color="text.secondary">
          {intl.formatMessage({ defaultMessage: 'OGN' })}
        </Typography>
      </ColorChip>
    </Stack>
  );
};
