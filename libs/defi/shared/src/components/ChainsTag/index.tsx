import { alpha, Stack, Typography } from '@mui/material';
import { ChainIcon } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

type ChainsTagProps = {
  chainIds: readonly number[];
  iconSize?: number;
} & StackProps;

export const ChainsTag = ({
  chainIds,
  iconSize = 24,
  ...rest
}: ChainsTagProps) => {
  const intl = useIntl();

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      bgcolor={(theme) => alpha(theme.palette.primary.main, 0.2)}
      px={2}
      py={1}
      borderRadius={2}
      {...rest}
    >
      <Typography variant="caption1" color="primary.main">
        {intl.formatMessage({ defaultMessage: 'Available on' })}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        {chainIds.map((id) => (
          <ChainIcon key={id} chainId={id} sx={{ fontSize: iconSize }} />
        ))}
      </Stack>
    </Stack>
  );
};
