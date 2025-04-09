import { forwardRef, useEffect, useRef, useState } from 'react';

import { InputBase } from '@mui/material';
import { eq, format, from } from 'dnum';

import type { InputBaseProps } from '@mui/material';
import type { Dnum } from 'dnum';
import type { ChangeEvent, FocusEvent } from 'react';

export type DnumInputProps = {
  value: Dnum;
  onChange?: (value: Dnum) => void;
  isError?: boolean;
  /**
   * Number of decimal places to display for controlled updates.
   * This doesn't affect user input precision.
   * @default 8
   */
  precision?: number;
} & Omit<InputBaseProps, 'value' | 'onChange' | 'inputRef'>;

type UpdateSource = 'user' | 'prop' | null;

export const DnumInput = forwardRef<HTMLInputElement, DnumInputProps>(
  ({ value, isError, onChange, precision = 8, ...rest }, ref) => {
    const [displayValue, setDisplayValue] = useState(() =>
      eq(value, 0)
        ? ''
        : format(value, {
            decimalsRounding: 'ROUND_DOWN',
            digits: precision,
          }),
    );

    const updateSourceRef = useRef<UpdateSource>(null);
    const prevValueRef = useRef(value);

    useEffect(() => {
      if (
        updateSourceRef.current !== 'user' &&
        !eq(value, prevValueRef.current)
      ) {
        const formattedValue = eq(value, 0)
          ? ''
          : format(value, {
              decimalsRounding: 'ROUND_DOWN',
              digits: precision,
            });
        setDisplayValue(formattedValue);
        updateSourceRef.current = 'prop';
      }
      prevValueRef.current = value;
    }, [value, precision]);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
      const newValue = evt.target.value;
      const regex = new RegExp(`^[0-9]*\\.?[0-9]{0,18}$`);

      if (evt.target.validity.valid && regex.test(newValue)) {
        if (newValue === '') {
          setDisplayValue('');
          updateSourceRef.current = 'user';
          if (onChange) {
            onChange([0n, value[1]]);
          }
          return;
        }

        if (newValue === '.') {
          setDisplayValue('0.');
          updateSourceRef.current = 'user';
          if (onChange) {
            onChange([0n, value[1]]);
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
          const num = from(cleanValue, value[1]);
          if (onChange && !eq(num, value)) {
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

DnumInput.displayName = 'DnumInput';
