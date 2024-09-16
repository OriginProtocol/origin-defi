import { Button, ButtonGroup } from '@mui/material';
import { useIntl } from 'react-intl';

import type { ButtonGroupProps } from '@mui/material';

export type LimitControlsProps = {
  limit: number | undefined;
  setLimit: (value: number | undefined) => void;
  disableAll?: boolean;
} & ButtonGroupProps;

export const LimitControls = ({
  limit,
  setLimit,
  disableAll,
  ...rest
}: LimitControlsProps) => {
  const intl = useIntl();

  return (
    <ButtonGroup size="small" variant="outlined" color="secondary" {...rest}>
      {[
        { value: 7, label: intl.formatMessage({ defaultMessage: '1W' }) },
        { value: 30, label: intl.formatMessage({ defaultMessage: '1M' }) },
        {
          value: Math.floor((365 / 12) * 6),
          label: intl.formatMessage({ defaultMessage: '6M' }),
        },
        {
          value: 365,
          label: intl.formatMessage({ defaultMessage: '1YR' }),
        },
        ...(disableAll
          ? []
          : [
              {
                value: undefined,
                label: intl.formatMessage({ defaultMessage: 'All' }),
              },
            ]),
      ].map((b) => (
        <Button
          key={b.value ?? 'all'}
          onClick={() => {
            setLimit(b.value);
          }}
          sx={[
            ...(b.value === limit
              ? [{ backgroundColor: 'secondary.main' }]
              : []),
          ]}
        >
          {b.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};
