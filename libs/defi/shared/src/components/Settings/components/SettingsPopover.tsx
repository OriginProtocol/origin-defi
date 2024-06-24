import { useState } from 'react';

import { Collapse, Stack, Typography } from '@mui/material';
import {
  ClickAwayPopover,
  InfoTooltipLabel,
  PercentInput,
  SliderSwitch,
} from '@origin/shared/components';
import { FaCircleExclamationRegular } from '@origin/shared/icons';
import {
  DEFAULT_SLIPPAGE,
  useSlippage,
  WARNING_THRESHOLD,
} from '@origin/shared/providers';
import { useIntl } from 'react-intl';

import type { ClickAwayPopoverProps, Option } from '@origin/shared/components';

export const SettingsPopover = (
  props: Omit<ClickAwayPopoverProps, 'children'>,
) => {
  const intl = useIntl();
  const { value, set } = useSlippage();
  const [option, setOption] = useState(
    value === DEFAULT_SLIPPAGE ? 'auto' : 'custom',
  );

  const handleOptionChange = (val: string | number) => {
    setOption(val as string);
    if (val === 'auto') {
      set(DEFAULT_SLIPPAGE);
    }
  };

  const handleValueChange = (val: number) => {
    set(val);
  };

  const options: Option[] = [
    { label: intl.formatMessage({ defaultMessage: 'Auto' }), value: 'auto' },
    {
      label: intl.formatMessage({ defaultMessage: 'Custom' }),
      value: 'custom',
    },
  ];

  return (
    <ClickAwayPopover
      {...props}
      paperProps={{
        sx: {
          mt: 1,
          borderRadius: 4,
          p: 3,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.highlight',
        },
      }}
    >
      <Stack>
        <InfoTooltipLabel
          tooltipLabel={intl.formatMessage({
            defaultMessage:
              'Your transaction will revert if the price changes unfavorably by more than this percentage.',
          })}
          mb={0.75}
        >
          {intl.formatMessage({ defaultMessage: 'Max slippage' })}
        </InfoTooltipLabel>
        <Stack direction="row" alignItems="center" spacing={2}>
          <SliderSwitch
            options={options}
            value={option}
            onChange={handleOptionChange}
            sx={{ borderRadius: 2, backgroundColor: 'background.default' }}
            selectedSx={{
              borderRadius: 2,
              backgroundColor: 'background.highlight',
              boxShadow: (theme) =>
                `inset 0 0 0 2px ${theme.palette.background.default},inset 0 0 0 3px ${theme.palette.divider}`,
            }}
          />
          <PercentInput
            value={value}
            disabled={option === 'auto'}
            onChange={handleValueChange}
            sx={(theme) => ({
              height: 36,
              borderRadius: 2,
              px: 0.5,
              maxWidth: 90,
              border: '1px solid',
              borderColor: 'divider',
              ...theme.typography.body3,
            })}
          />
        </Stack>
        <Collapse in={value > WARNING_THRESHOLD}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              backgroundColor: 'warning.faded',
              p: 1,
              mt: 2,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'warning.main',
            }}
          >
            <FaCircleExclamationRegular
              sx={{ color: 'warning.main', fontSize: 18 }}
            />
            <Typography color="warning.dark">
              {intl.formatMessage({
                defaultMessage: 'Your transaction may be frontrun',
              })}
            </Typography>
          </Stack>
        </Collapse>
      </Stack>
    </ClickAwayPopover>
  );
};
