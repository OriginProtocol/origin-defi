import { Button, Stack } from '@mui/material';

import { useResetPoints, useStartStop } from '../hooks';
import { useDPrice } from '../state';

export const Controls = () => {
  const [{ interval }] = useDPrice();
  const handleStartStop = useStartStop();
  const handleReset = useResetPoints();

  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={handleStartStop}>
        {interval === undefined ? 'Start' : 'Stop'}
      </Button>
      <Button onClick={handleReset}>Reset</Button>
    </Stack>
  );
};
