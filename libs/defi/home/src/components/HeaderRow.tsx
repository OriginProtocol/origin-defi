import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useIntl } from 'react-intl';

import { GRID_SIZES } from '../constants';

import type { GridProps, StackProps, TypographyProps } from '@mui/material';

export const HeaderRow = (props: StackProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));

  if (isSm) {
    return null;
  }

  return (
    <Stack
      direction="row"
      {...props}
      sx={[
        {
          px: 3,
        },
        ...(Array.isArray(props?.sx) ? props.sx : [props?.sx]),
      ]}
    >
      <Grid container spacing={1} sx={{ width: 1 }}>
        <Grid size={GRID_SIZES[0]} {...gridProps}>
          <Typography {...headerProps}>
            {intl.formatMessage({ defaultMessage: 'Product name' })}
          </Typography>
        </Grid>
        <Grid size={GRID_SIZES[1]} {...gridProps}>
          <Typography {...headerProps}>
            {intl.formatMessage({ defaultMessage: 'Product type' })}
          </Typography>
        </Grid>
        <Grid size={GRID_SIZES[2]} {...gridProps}>
          <Typography {...headerProps}>
            {intl.formatMessage({ defaultMessage: 'APY' })}
          </Typography>
        </Grid>
        <Grid size={GRID_SIZES[3]} {...gridProps}>
          <Typography {...headerProps}>
            {intl.formatMessage({ defaultMessage: 'TVL' })}
          </Typography>
        </Grid>
        <Grid size={GRID_SIZES[4]} {...gridProps}>
          <Typography {...headerProps}>
            {intl.formatMessage({ defaultMessage: 'Balance' })}
          </Typography>
        </Grid>
        <Grid size={GRID_SIZES[5]} {...gridProps}>
          <Typography {...headerProps}>
            {intl.formatMessage({ defaultMessage: 'Yield earned' })}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
};

const headerProps: Partial<TypographyProps> = {
  variant: 'caption1',
  sx: {
    color: 'text.secondary',
  },
};

const gridProps: Partial<GridProps> = {
  sx: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};
