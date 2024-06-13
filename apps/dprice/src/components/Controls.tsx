import { Button, Slider, Stack, Typography } from '@mui/material';
import {
  FaChevronLeftRegular,
  FaChevronRightRegular,
  FaVolumeRegular,
  FaVolumeSlashRegular,
} from '@origin/shared/icons';
import { ThemeModeIconButton } from '@origin/shared/providers';

import csv from '../data.csv';
import {
  useMute,
  useNavigatePoints,
  useResetPoints,
  useSpan,
  useStartStop,
} from '../hooks';
import { useDPrice } from '../state';

export const Controls = () => {
  const [{ interval, muted, span }] = useDPrice();
  const handleStartStop = useStartStop();
  const handleReset = useResetPoints();
  const move = useNavigatePoints();
  const mute = useMute();
  const updateSpan = useSpan();

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    updateSpan(newValue as number);
  };

  const total = csv.length;
  const largeStep = Math.round(total / 10);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Button
        onClick={() => {
          move('backward', largeStep);
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
          move('forward', largeStep);
        }}
      >
        <FaChevronRightRegular />
        <FaChevronRightRegular />
      </Button>
      <ThemeModeIconButton />
      <Button
        onClick={() => {
          mute();
        }}
        sx={{ backgroundColor: muted ? 'primary.faded' : 'primary.main' }}
      >
        {muted ? <FaVolumeSlashRegular /> : <FaVolumeRegular />}
      </Button>
      <Slider
        onChange={handleSliderChange}
        min={30}
        max={total}
        value={span}
        sx={{ maxWidth: 300 }}
      />
      <Typography>{span}</Typography>
    </Stack>
  );
};
