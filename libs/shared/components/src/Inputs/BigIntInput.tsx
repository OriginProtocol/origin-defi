import { forwardRef, useEffect, useState } from 'react';

import { InputBase } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { formatUnits, parseUnits } from 'viem';

import type { InputBaseProps } from '@mui/material';
import type { ChangeEvent } from 'react';

export type BigintInputProps = {
  value: bigint;
  decimals?: number;
  onChange?: (value: bigint) => void;
  isError?: boolean;
} & Omit<InputBaseProps, 'value' | 'onChange' | 'inputRef'>;

export const BigIntInput = forwardRef<HTMLInputElement, BigintInputProps>(
  ({ value, decimals = 18, isError, onChange, ...rest }, ref) => {
    const [strVal, setStrVal] = useState(formatUnits(value, decimals));
    const prev = usePrevious(strVal);

    useEffect(() => {
      if (value === 0n && (isNilOrEmpty(strVal) || strVal === '0.')) {
        return;
      }

      if (value === 0n && !/0\.0+$/.test(strVal)) {
        setStrVal('');
        return;
      }

      if (
        isNilOrEmpty(strVal) ||
        isNilOrEmpty(prev) ||
        strVal === '0.' ||
        value !== parseUnits(prev, decimals)
      ) {
        setStrVal(formatUnits(value, decimals));
      }
    }, [value, decimals, strVal, prev]);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
      const regex = new RegExp(`^[0-9]*\\.?[0-9]{0,${decimals}}$`);
      if (evt.target.validity.valid && regex.test(evt.target.value)) {
        setStrVal(evt.target.value === '.' ? '0.' : evt.target.value);
        const val =
          isNilOrEmpty(evt.target.value) || evt.target.value === '.'
            ? '0'
            : evt.target.value.replace(/\.0+$/, '');
        try {
          const num = parseUnits(val, decimals);
          if (onChange && num !== value) {
            onChange(num);
          }
        } catch {}
      }
    };

    return (
      <InputBase
        type="text"
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        placeholder="0"
        {...rest}
        inputRef={ref}
        inputMode="decimal"
        value={strVal}
        onChange={handleChange}
        inputProps={{
          minLength: 0,
          maxLength: 30,
          inputMode: 'decimal',
          ...rest?.inputProps,
        }}
      />
    );
  },
);

BigIntInput.displayName = 'BigIntInput';
