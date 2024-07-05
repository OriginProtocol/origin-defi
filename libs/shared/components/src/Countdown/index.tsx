import { useState } from 'react';

import { Stack } from '@mui/material';
import { useIntervalEffect } from '@react-hookz/web';
import { differenceInMinutes, isPast } from 'date-fns';
import {
  millisecondsInMinute,
  minutesInDay,
  minutesInHour,
} from 'date-fns/constants';
import { useIntl } from 'react-intl';

import { ValueLabel } from '../Labels';

import type { StackProps } from '@mui/material';

import type { ValueLabelProps } from '../Labels';

export type CountdownProps = {
  targetDate: Date;
  valueLabelProps?: Partial<ValueLabelProps>;
  showUnits?: boolean;
} & StackProps;

export const Countdown = ({
  targetDate,
  valueLabelProps,
  showUnits,
  ...rest
}: CountdownProps) => {
  const intl = useIntl();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useIntervalEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate));
  }, millisecondsInMinute);

  return (
    <Stack direction="row" spacing={1} {...rest}>
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'Days' })}
        value={`${timeLeft.days}${showUnits ? 'd' : ''}`}
        {...valueLabelProps}
      />
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'Hours' })}
        value={`${timeLeft.hours}${showUnits ? 'h' : ''}`}
        {...valueLabelProps}
      />
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'Mins' })}
        value={`${timeLeft.minutes}${showUnits ? 'm' : ''}`}
        {...valueLabelProps}
      />
    </Stack>
  );
};

const calculateTimeLeft = (target: Date) => {
  if (isPast(target)) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const diffInMinutes = differenceInMinutes(target, new Date());

  const days = Math.floor(diffInMinutes / minutesInDay);
  const hours = Math.floor((diffInMinutes % minutesInDay) / minutesInHour);
  const minutes = Math.floor(diffInMinutes % minutesInHour);

  return { days, hours, minutes };
};
