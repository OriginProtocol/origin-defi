import { Collapse, Skeleton, Stack, Typography } from '@mui/material';
import { InfoTooltip } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { useRedeemState } from '../state';
import { RedeemSplitCard } from './RedeemSplitCard';

import type { StackProps } from '@mui/material';

export function RedeemRoute(props: Omit<StackProps, 'children'>) {
  const intl = useIntl();
  const [{ amountOut, isEstimateLoading }] = useRedeemState();

  const hasContent = amountOut > 0n;

  return (
    <Stack
      {...props}
      sx={{
        backgroundColor: 'grey.900',
        borderRadius: 1,
        padding: 2,
        ...props?.sx,
      }}
    >
      {isEstimateLoading ? (
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={(theme) => ({ color: theme.palette.primary.contrastText })}
        >
          <Skeleton
            variant="circular"
            width="0.5rem"
            height="0.5rem"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.contrastText,
            }}
          />
          <Typography variant="body2">
            {intl.formatMessage({
              defaultMessage: 'Estimating...',
            })}
          </Typography>
        </Stack>
      ) : (
        <Stack
          direction="row"
          gap={0.5}
          component={Typography}
          variant="body2"
          alignItems="center"
          color="primary.contrastText"
        >
          {intl.formatMessage({ defaultMessage: 'Route' })}
          <InfoTooltip
            tooltipLabel={intl.formatMessage({
              defaultMessage: 'Redeem OETH for the basket of underlying assets',
            })}
          />
        </Stack>
      )}
      <Collapse in={hasContent} sx={{ pt: hasContent ? 2 : 0 }}>
        <RedeemSplitCard />
      </Collapse>
    </Stack>
  );
}
