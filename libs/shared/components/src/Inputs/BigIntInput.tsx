import { forwardRef, useEffect, useState } from 'react';

import { InputBase } from '@mui/material';
import { Skeleton } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { formatUnits, parseUnits } from 'viem';

import type { InputBaseProps } from '@mui/material';
import type { ChangeEvent } from 'react';

export type BigintInputProps = {
  value: bigint;
  decimals?: number;
  onChange?: (value: bigint) => void;
  isLoading?: boolean;
  isError?: boolean;
} & Omit<InputBaseProps, 'value' | 'onChange' | 'inputRef'>;

export const BigIntInput = forwardRef<HTMLInputElement, BigintInputProps>(
  ({ value, decimals = 18, isLoading, isError, onChange, ...rest }, ref) => {
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
        strVal === '0.' ||
        value !== parseUnits(prev, decimals)
      ) {
        setStrVal(formatUnits(value, decimals));
      }
    }, [value, decimals, strVal, prev]);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
      if (evt.target.validity.valid) {
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

    return isLoading ? (
      <Skeleton width={100} height={24} />
    ) : (
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
          pattern: `[0-9]*(.[0-9]{0,${decimals}})`,
          minLength: 0,
          maxLength: 30,
          inputMode: 'decimal',
        }}
      />
    );
  },
);

BigIntInput.displayName = 'BigIntInput';
