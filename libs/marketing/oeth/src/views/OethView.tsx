import { Stack } from '@mui/material';
import { useIntl } from 'react-intl';

import { AnimatedHero } from '../components/AnimatedHero';

export const OethView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <AnimatedHero />
    </Stack>
  );
};
