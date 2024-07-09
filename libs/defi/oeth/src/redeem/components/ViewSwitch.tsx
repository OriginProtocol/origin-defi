import { Stack } from '@mui/material';
import { SliderSwitch } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { useViewSelect } from '../hooks';

import type { StackProps } from '@mui/material';
import type { Option } from '@origin/shared/components';

export const ViewSwitch = (props: StackProps) => {
  const intl = useIntl();
  const { view, update } = useViewSelect();

  const handleChange = (newVal: string | number) => {
    update(newVal as 'request' | 'claim');
  };

  const options: Option[] = [
    {
      label: intl.formatMessage({ defaultMessage: 'Request' }),
      value: 'request',
    },
    { label: intl.formatMessage({ defaultMessage: 'Claim' }), value: 'claim' },
  ];

  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <SliderSwitch
        options={options}
        value={view}
        onChange={handleChange}
        sx={{ borderRadius: 2, backgroundColor: 'background.default' }}
        selectedSx={{
          borderRadius: 2,
          color: 'primary.contrastText',
          backgroundColor: 'primary.main',
          boxShadow: (theme) =>
            `inset 0 0 0 1px ${theme.palette.background.default}`,
        }}
      />
    </Stack>
  );
};
