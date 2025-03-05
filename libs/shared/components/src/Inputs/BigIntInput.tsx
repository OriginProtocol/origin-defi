import { forwardRef, useEffect, useRef, useState } from 'react';

import { InputBase } from '@mui/material';
import { formatUnits, parseUnits } from 'viem';

import type { InputBaseProps } from '@mui/material';
import type { ChangeEvent } from 'react';

export type BigintInputProps = {
  value: bigint;
  /**
   * Number of decimals for the underlying value
   * @default 18
   */
  decimals?: number;
  /**
   * Number of decimal places to display for controlled updates.
   * This doesn't affect user input precision.
   * @default 8
   */
  precision?: number;
  onChange?: (value: bigint) => void;
  isError?: boolean;
} & Omit<InputBaseProps, 'value' | 'onChange' | 'inputRef'>;

type UpdateSource = 'user' | 'prop' | null;

export const BigIntInput = forwardRef<HTMLInputElement, BigintInputProps>(
  (
    { value, decimals = 18, precision = 8, isError, onChange, ...rest },
    ref,
  ) => {
    const displayPrecision = precision ?? decimals;

    const [displayValue, setDisplayValue] = useState(() =>
      value === 0n
        ? ''
        : formatUnits(value, decimals).slice(
            0,
            formatUnits(value, decimals).indexOf('.') + displayPrecision + 1,
          ),
    );

    const updateSourceRef = useRef<UpdateSource>(null);
    const prevValueRef = useRef(value);

    useEffect(() => {
      if (
        updateSourceRef.current !== 'user' &&
        value !== prevValueRef.current
      ) {
        const fullValue = formatUnits(value, decimals);
        const dotIndex = fullValue.indexOf('.');
        const formattedValue =
          dotIndex === -1
            ? fullValue
            : fullValue.slice(0, dotIndex + displayPrecision + 1);
        setDisplayValue(formattedValue);
        updateSourceRef.current = 'prop';
      }
      prevValueRef.current = value;
    }, [value, decimals, displayPrecision]);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
      const newValue = evt.target.value;
      const regex = new RegExp(`^[0-9]*\\.?[0-9]*$`);

      if (evt.target.validity.valid && regex.test(newValue)) {
        if (newValue === '') {
          setDisplayValue('');
          updateSourceRef.current = 'user';
          if (onChange) {
            onChange(0n);
          }
          return;
        }

        if (newValue === '.') {
          setDisplayValue('0.');
          updateSourceRef.current = 'user';
          if (onChange) {
            onChange(0n);
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
          const num = parseUnits(cleanValue, decimals);
          if (onChange && num !== value) {
            onChange(num);
          }
        } catch {}
      }
    };

    const handleBlur = () => {
      updateSourceRef.current = null;
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

BigIntInput.displayName = 'BigIntInput';
