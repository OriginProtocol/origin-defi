import { forwardRef, useEffect, useState } from 'react';

import { InputBase } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';
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
        value !== parseUnits(strVal, decimals)
      ) {
        setStrVal(formatUnits(value, decimals));
      }
    }, [value, decimals, strVal]);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
      if (evt.target.validity.valid) {
        const val =
          isNilOrEmpty(evt.target.value) || evt.target.value === '.'
            ? '0'
            : evt.target.value.replace(/\.0+$/, '');

        try {
          const num = parseUnits(val, decimals);
          setStrVal(evt.target.value === '.' ? '0.' : evt.target.value);
          if (onChange && num !== value) {
            onChange(num);
          }
        } catch {}
      }
    };

    return (
      <InputBase
        inputRef={ref}
        inputMode="decimal"
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        inputProps={{
          pattern: `[0-9]*(.[0-9]{0,${decimals}})`,
          minLength: 0,
          maxLength: 69,
        }}
        value={strVal}
        onChange={handleChange}
        placeholder="0"
        {...rest}
        sx={{
          border: 'none',
          backgroundColor: 'transparent',
          borderRadius: 0,
          paddingBlock: 0,
          paddingInline: 0,
          borderImageWidth: 0,
          boxSizing: 'border-box',
          position: 'relative',
          bottom: '-4px',
          '& .MuiInputBase-input': {
            padding: 0,
            lineHeight: '1.5rem',
            boxSizing: 'border-box',
            fontStyle: 'normal',
            fontFamily: 'Sailec, Inter, Helvetica, Arial, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            height: '1.5rem',
            color: 'primary.contrastText',
            '&::placeholder': {
              color: 'text.secondary',
              opacity: 1,
            },
          },
          ...rest?.sx,
        }}
      />
    );
  },
);

BigIntInput.displayName = 'BigIntInput';
