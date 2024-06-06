import { Stack, Typography } from '@mui/material';
import { ErrorTooltipLabel, ExternalLink } from '@origin/shared/components';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';

import { activityOptions } from '../constants';
import { ActivityIcon } from './ActivityIcon';

import type { StackProps } from '@mui/material';

import type { Activity } from '..';

export type ActivityTileProps = { activity: Activity } & StackProps;

export const ActivityTile = ({ activity, ...rest }: ActivityTileProps) => {
  const intl = useIntl();

  const option = activityOptions[activity.type];
  const title = option.title(activity, intl);
  const subtitle = option.subtitle(activity, intl);
  const icon = option.icon(activity);
  const href = isNilOrEmpty(activity?.txHash)
    ? undefined
    : `https://etherscan.io/tx/${activity?.txHash}`;

  return (
    <Stack width={1} direction="row" justifyContent="space-between" {...rest}>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ActivityIcon status={activity.status} sx={{ fontSize: 20 }} />
          {!isNilOrEmpty(href) ? (
            <ExternalLink href={href}>{title}</ExternalLink>
          ) : (
            <Typography>{title}</Typography>
          )}
        </Stack>
        <Stack direction="row" alignItems="center">
          {isNilOrEmpty(activity?.error) ? (
            <Typography color="text.secondary">{subtitle}</Typography>
          ) : (
            <ErrorTooltipLabel>{activity.error}</ErrorTooltipLabel>
          )}
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        {icon}
      </Stack>
    </Stack>
  );
};
