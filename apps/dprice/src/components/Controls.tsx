import { Button, Stack } from '@mui/material';
import {
  FaChevronLeftRegular,
  FaChevronRightRegular,
} from '@origin/shared/icons';

import { useNavigatePoints, useResetPoints, useStartStop } from '../hooks';
import { useDPrice } from '../state';

export const Controls = () => {
  const [{ interval }] = useDPrice();
  const handleStartStop = useStartStop();
  const handleReset = useResetPoints();
  const move = useNavigatePoints();

  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
      <Button
        onClick={() => {
          move('backward', 10);
        }}
      >
        <FaChevronLeftRegular />
        <FaChevronLeftRegular />
      </Button>
      <Button
        onClick={() => {
          move('backward');
        }}
      >
        <FaChevronLeftRegular />
      </Button>
      <Button onClick={handleStartStop}>
        {interval === undefined ? 'Start' : 'Stop'}
      </Button>
      <Button onClick={handleReset}>Reset</Button>
      <Button
        onClick={() => {
          move('forward');
        }}
      >
        <FaChevronRightRegular />
      </Button>
      <Button
        onClick={() => {
          move('forward', 10);
        }}
      >
        <FaChevronRightRegular />
        <FaChevronRightRegular />
      </Button>
    </Stack>
  );
};
