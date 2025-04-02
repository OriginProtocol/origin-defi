import { useState } from 'react';

import { CircularProgress } from '@mui/material';
import { useIntervalEffect } from '@react-hookz/web';

import type { CircularProgressProps } from '@mui/material';

export type TimeCountdownIconProps = {
  ms: number;
  loop?: boolean;
  onComplete?: () => void;
} & Omit<CircularProgressProps, 'value' | 'variant'>;

export const TimeCountdownIcon = ({
  ms,
  loop = false,
  onComplete,
  ...rest
}: TimeCountdownIconProps) => {
  const [progress, setProgress] = useState(100);
  const [startTime, setStartTime] = useState(Date.now());

  useIntervalEffect(() => {
    const elapsed = Date.now() - startTime;
    const newProgress = Math.max(0, 100 - (elapsed / ms) * 100);
    setProgress(newProgress);

    if (newProgress === 0) {
      onComplete?.();
      if (loop) {
        setStartTime(Date.now());
      }
    }
  }, 200);

  return <CircularProgress {...rest} variant="determinate" value={progress} />;
};
