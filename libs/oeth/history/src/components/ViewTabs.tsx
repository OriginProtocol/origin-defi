import { alpha, Link, Stack } from '@mui/material';
import { TokenButton } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { Link as RouterLink, useMatch } from 'react-router-dom';

export const ViewTabs = () => {
  const match = useMatch('/history/:otoken');
  return (
    <Stack direction={'row'} mb={3} justifyContent={'center'}>
      <Stack
        direction={'row'}
        spacing={1}
        sx={{
          borderRadius: 25,
          background: (theme) => alpha(theme.palette.common.white, 0.1),
        }}
      >
        <Link
          to={'/history'}
          sx={{ color: 'text.primary' }}
          component={RouterLink}
        >
          <TokenButton
            token={tokens.mainnet.OETH}
            size={'md'}
            sx={{ background: undefined }}
            active={match?.params.otoken !== 'woeth'}
          />
        </Link>
        <Link
          to={'/history/woeth'}
          sx={{ color: 'text.primary' }}
          component={RouterLink}
        >
          <TokenButton
            token={tokens.mainnet.wOETH}
            size={'md'}
            sx={{ background: undefined }}
            active={match?.params.otoken === 'woeth'}
          />
        </Link>
      </Stack>
    </Stack>
  );
};
