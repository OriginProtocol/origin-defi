import { Popover, useTheme } from '@mui/material';

import { SlippageFormControl } from '../../slippage';

import type { ButtonProps, PopoverProps } from '@mui/material';

export type SettingsPopoverProps = {
  formButtonProps?: ButtonProps;
  trackEvent?: (args: {
    name: 'change_price_tolerance';
    price_tolerance: number;
  }) => void;
} & PopoverProps;

export const SettingsPopover = ({
  formButtonProps,
  trackEvent,
  ...rest
}: SettingsPopoverProps) => {
  const theme = useTheme();

  const handleSlippageChange = (val: number) => {
    trackEvent?.({
      name: 'change_price_tolerance',
      price_tolerance: val,
    });
  };

  return (
    <Popover
      {...rest}
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
        ...rest?.sx,
      }}
    >
      <SlippageFormControl
        onChange={handleSlippageChange}
        buttonProps={formButtonProps}
      />
    </Popover>
  );
};
