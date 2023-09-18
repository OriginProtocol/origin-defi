import { Collapse, Stack, Typography } from '@mui/material';
import { Card, cardStyles } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { useRedeemState } from '../state';
import { RedeemInfo } from './RedeemInfo';
import { RedeemSplitCard } from './RedeemSplitCard';
import { RouteCard } from './RouteCard';

import type { CardProps } from '@mui/material';

export function RedeemRoute(props: Omit<CardProps, 'children'>) {
  const intl = useIntl();
  const [{ amountOut }] = useRedeemState();

  const hasContent = amountOut > 0n;

  return (
    <Card
      {...props}
      sx={{
        border: '1px solid',
        borderColor: (theme) => theme.palette.background.default,
        backgroundColor: 'grey.900',
        borderRadius: 1,
        ...props?.sx,
      }}
      title={
        <Stack
          direction="row"
          gap={0.5}
          component={Typography}
          variant="body2"
          alignItems="center"
          color="primary.contrastText"
        >
          {intl.formatMessage({ defaultMessage: 'Route' })}
          <RedeemInfo />
        </Stack>
      }
      sxCardTitle={{ borderBottom: 'none', paddingBlock: 1, paddingInline: 2 }}
      sxCardContent={{
        ...(hasContent
          ? cardStyles
          : {
              p: 0,
              paddingBlock: 0,
              paddingInline: 0,
              '&:last-child': { pb: 0 },
            }),
      }}
    >
      <Collapse in={hasContent}>
        <Stack spacing={1}>
          <RouteCard />
          <RedeemSplitCard />
        </Stack>
      </Collapse>
    </Card>
  );
}
