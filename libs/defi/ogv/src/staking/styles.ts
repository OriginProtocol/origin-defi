import type { CardContentProps, StackProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const valueLabelProps: Partial<ValueLabelProps> = {
  labelProps: {
    variant: 'body1',
    sx: { flexGrow: 1, textWrap: 'balance', textAlign: 'center' },
  },
  valueProps: {
    variant: 'h3',
  },
  spacing: 0.75,
  p: 3,
};

export const cardContentProps: CardContentProps = {
  sx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 72,
  },
};

export const cardInputStackProps: StackProps = {
  sx: {
    px: 3,
    py: 2,
    borderRadius: 1,
    backgroundColor: 'background.default',
    border: '1px solid',
    borderColor: 'divider',
  },
};
