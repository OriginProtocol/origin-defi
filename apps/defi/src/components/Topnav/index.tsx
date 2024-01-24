import { Box, useMediaQuery, useTheme } from '@mui/material';

import { TopnavLarge } from './components/TopnavLarge';
import { TopnavSmall } from './components/TopnavSmall';

export const Topnav = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Box
        sx={{
          height: {
            xs: '56px',
            md: '72px',
          },
        }}
      />
      {isSm ? <TopnavSmall /> : <TopnavLarge />}
    </>
  );
};
