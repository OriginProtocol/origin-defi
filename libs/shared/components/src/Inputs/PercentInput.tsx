import { forwardRef, useEffect, useRef, useState } from 'react';

import { InputBase } from '@mui/material';

import type { InputBaseProps } from '@mui/material';
import type { ChangeEvent, FocusEvent } from 'react';

export type PercentInputProps = {
  value: number;
  /**
   * Number of decimal places to display for controlled updates.
   * This doesn't affect user input precision.
   * @default 4
   */
  precision?: number;
  onChange?: (value: number) => void;
} & Omit<InputBaseProps, 'value' | 'onChange' | 'inputRef'>;

type UpdateSource = 'user' | 'prop' | null;

export const PercentInput = forwardRef<HTMLInputElement, PercentInputProps>(
  ({ value, precision = 4, onChange, ...rest }, ref) => {
    const [displayValue, setDisplayValue] = useState(() =>
      value === 0 ? '' : formatPercent(value, precision),
    );

    const updateSourceRef = useRef<UpdateSource>(null);
    const prevValueRef = useRef(value);

    useEffect(() => {
      if (
        updateSourceRef.current !== 'user' &&
        value !== prevValueRef.current
      ) {
        const formattedValue =
          value === 0 ? '' : formatPercent(value, precision);
        setDisplayValue(formattedValue);
        updateSourceRef.current = 'prop';
      }
      prevValueRef.current = value;
    }, [value, precision]);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
      const newValue = evt.target.value;
      const regex = new RegExp(`^[0-9]*\\.?[0-9]{0,${precision}}$`);

      if (evt.target.validity.valid && regex.test(newValue)) {
        if (newValue === '') {
          setDisplayValue('');
          updateSourceRef.current = 'user';
          if (onChange) {
            onChange(0);
          }
          return;
        }

        if (newValue === '.') {
          setDisplayValue('0.');
          updateSourceRef.current = 'user';
          if (onChange) {
            onChange(0);
          }
          return;
        }

        const cleanValue =
          newValue.startsWith('0') && !newValue.startsWith('0.')
            ? newValue.replace(/^0+/, '') || '0'
            : newValue;

        setDisplayValue(cleanValue);
        updateSourceRef.current = 'user';

        try {
          const num = Number(cleanValue) / 100;
          if (onChange && num !== value) {
            onChange(num);
          }
        } catch {}
      }
    };

    const handleBlur = (evt: FocusEvent<HTMLInputElement>) => {
      updateSourceRef.current = null;
      rest?.onBlur?.(evt);
    };

    return (
      <InputBase
        type="text"
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        endAdornment="%"
        {...rest}
        inputRef={ref}
        inputMode="decimal"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        inputProps={{
          minLength: 0,
          maxLength: 30,
          inputMode: 'decimal',
          placeholder: '0',
          ...rest?.inputProps,
        }}
      />
    );
  },
);

PercentInput.displayName = 'PercentInput';

function formatPercent(value: number, precision: number) {
  return Intl.NumberFormat('en', {
    useGrouping: false,
    maximumFractionDigits: precision,
  }).format(value * 100);
}
