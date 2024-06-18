import { Box, Stack, Typography } from '@mui/material';
import {
  ErrorTooltipLabel,
  ExternalLink,
  TooltipLabel,
} from '@origin/shared/components';
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
    <Stack width={1} direction="row" spacing={1} {...rest}>
      <Box display="flex" justifyContent="center" alignItems="center">
        {icon}
      </Box>
      <Stack spacing={1} flexGrow={1} overflow="hidden">
        <Stack direction="row" alignItems="center" spacing={1}>
          <ActivityIcon status={activity.status} sx={{ fontSize: 20 }} />
          {!isNilOrEmpty(href) ? (
            <ExternalLink href={href}>{title}</ExternalLink>
          ) : (
            <Typography>{title}</Typography>
          )}
        </Stack>
        {isNilOrEmpty(activity?.error) ? (
          <TooltipLabel color="text.secondary" maxChars={40}>
            {subtitle}
          </TooltipLabel>
        ) : (
          <ErrorTooltipLabel>{activity.error}</ErrorTooltipLabel>
        )}
      </Stack>
      {!isNilOrEmpty(option?.endIcon?.(activity)) && (
        <Stack direction="row" alignItems="center" spacing={1}>
          {option?.endIcon?.(activity)}
        </Stack>
      )}
    </Stack>
  );
};
