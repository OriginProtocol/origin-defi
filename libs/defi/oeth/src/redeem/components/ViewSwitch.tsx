import { Stack } from '@mui/material';
import { SliderSwitch } from '@origin/shared/components';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';

import { useViewSelect, useWithdrawalRequests } from '../hooks';

import type { StackProps } from '@mui/material';
import type { Option } from '@origin/shared/components';

export const ViewSwitch = (props: StackProps) => {
  const intl = useIntl();
  const { view, update } = useViewSelect();
  const { data: claimableRequests, isLoading: isClaimableRequestsLoading } =
    useWithdrawalRequests({
      select: (data) => data?.filter?.((r) => r.claimable),
    });

  const handleChange = (newVal: string | number) => {
    update(newVal as 'request' | 'claim');
  };

  const options: Option[] = [
    {
      label: intl.formatMessage({ defaultMessage: 'Request' }),
      value: 'request',
    },
    {
      label: intl.formatMessage(
        { defaultMessage: 'Claim{amount}' },
        {
          amount:
            isClaimableRequestsLoading || isNilOrEmpty(claimableRequests)
              ? ''
              : ` (${claimableRequests?.length})`,
        },
      ),
      value: 'claim',
    },
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
