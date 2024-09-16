import { MenuItem, Select } from '@mui/material';
import { defineMessage, useIntl } from 'react-intl';

import type { SelectProps } from '@mui/material';

export const trailingOptions = {
  apy7: defineMessage({ defaultMessage: '7-Day' }),
  apy14: defineMessage({ defaultMessage: '14-Day' }),
  apy30: defineMessage({ defaultMessage: '30-Day' }),
};

export type Trailing = keyof typeof trailingOptions;

export type TrailingControlsProps = {
  trailing: Trailing;
  setTrailing: (value: Trailing) => void;
} & SelectProps;

export const TrailingControls = ({
  trailing,
  setTrailing,
  ...rest
}: TrailingControlsProps) => {
  const intl = useIntl();

  return (
    <Select
      {...rest}
      displayEmpty
      size="small"
      color="secondary"
      variant="outlined"
      value={trailing}
      onChange={(event) => {
        setTrailing(event.target.value as Trailing);
      }}
      sx={[
        { fontSize: 13, minWidth: 40 },
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
      ]}
    >
      {Object.entries(trailingOptions).map(([trail, label]) => (
        <MenuItem key={trail} value={trail}>
          {intl.formatMessage(label)}
        </MenuItem>
      ))}
    </Select>
  );
};
