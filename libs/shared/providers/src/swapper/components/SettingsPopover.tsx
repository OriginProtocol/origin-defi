import { Popover, useTheme } from '@mui/material';

import { SlippageFormControl } from '../../slippage';
import { useSwapState } from '../state';

import type { ButtonProps, PopoverProps } from '@mui/material';

export type SettingsPopoverProps = {
  buttonProps?: ButtonProps;
} & PopoverProps;

export function SettingsPopover(props: PopoverProps) {
  const theme = useTheme();
  const [{ trackEvent }] = useSwapState();

  const handleSlippageChange = (val: number) => {
    trackEvent?.({
      name: 'change_price_tolerance',
      price_tolerance: val,
    });
  };

  return (
    <Popover
      {...props}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{
        '& .MuiPaper-root.MuiPopover-paper': {
          padding: 3,
          boxSizing: 'border-box',
          maxWidth: {
            xs: '90vw',
            md: '16.5rem',
          },
          width: '100%',
          border: '1px solid',
          borderColor: 'grey.700',
          [theme.breakpoints.down('md')]: {
            left: '0 !important',
            right: 0,
            marginInline: 'auto',
          },
        },
        ...props?.sx,
      }}
    >
      <SlippageFormControl
        onChange={handleSlippageChange}
        buttonProps={{
          sx: {
            color: 'text.primary',
            background: 'linear-gradient(90deg, #8C66FC 0%, #0274F1 100%)',
            '&:hover': {
              background:
                'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(90deg, #8C66FC 0%, #0274F1 100%)',
              opacity: 1,
            },
            '&:disabled': {
              opacity: 0.5,
              color: 'text.primary',
            },
          },
        }}
      />
    </Popover>
  );
}
