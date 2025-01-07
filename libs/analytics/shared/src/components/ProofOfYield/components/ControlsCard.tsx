import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { LoadingLabel } from '@origin/shared/components';
import { FaArrowLeftRegular, FaArrowRightRegular } from '@origin/shared/icons';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';

import { usePoY } from '../hooks';

import type { CardProps } from '@mui/material';

export const ControlsCard = (props: CardProps) => {
  const intl = useIntl();
  const { selectedItem, isLoading, handleNext, handlePrev, hasNext, hasPrev } =
    usePoY();

  return (
    <Card {...props}>
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Stack
            direction="row"
            useFlexGap
            sx={{
              alignItems: 'center',
              flexWrap: 'wrap',
              columnGap: 2,
              rowGap: 1,
            }}
          >
            <LoadingLabel
              isLoading={isLoading}
              variant="h6"
              sx={{ minWidth: 225 }}
            >
              {dayjs.utc(selectedItem?.timestamp).format('DD MMM YYYY')}
            </LoadingLabel>
            <Typography color="text.secondary">
              {intl.formatMessage({
                defaultMessage:
                  'Click the chart or use the arrow buttons to view a different date',
              })}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Button onClick={handleNext} disabled={!hasNext} color="secondary">
              <FaArrowLeftRegular />
            </Button>
            <Button onClick={handlePrev} disabled={!hasPrev} color="secondary">
              <FaArrowRightRegular />
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
