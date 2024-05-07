import { useState } from 'react';

import { alpha } from '@mui/material';
import { TokenInput as SharedTokenInput } from '@origin/shared/components';

import { TokenSelectModal } from './TokenSelectModal';

import type { TokenInputProps as SharedTokenInputProps } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';
import type { ComponentProps } from 'react';

export type TokenInputProps = SharedTokenInputProps & {
  tokens: Token[];
  onSelectToken: (token: Token) => void;
};

export const TokenInput = ({
  ref,
  onSelectToken,
  tokens,
  ...props
}: TokenInputProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <SharedTokenInput
        {...props}
        onTokenClick={() => {
          if (!props.isTokenClickDisabled) {
            setModalOpen(true);
          }
          props.onTokenClick?.();
        }}
      />
      <TokenSelectModal
        selectedToken={props.token}
        tokens={tokens}
        onSelectToken={onSelectToken}
        onClose={() => setModalOpen(false)}
        open={modalOpen}
      />
    </>
  );
};

const inputProps = {
  sx: {
    border: 'none',
    backgroundColor: 'transparent',
    borderRadius: 0,
    paddingBlock: 0,
    paddingInline: 0,
    borderImageWidth: 0,
    boxSizing: 'border-box',
    '& .MuiInputBase-input': {
      padding: 0,
      boxSizing: 'border-box',
      fontStyle: 'normal',
      fontFamily: 'Sailec, sans-serif',
      fontSize: 24,
      lineHeight: 1.5,
      fontWeight: 700,
      '&::placeholder': {
        color: 'text.secondary',
        opacity: 1,
      },
    },
  },
};

export const tokenInputStyleProps: Partial<ComponentProps<typeof TokenInput>> =
  {
    sx: {
      paddingBlock: 2.5,
      paddingBlockStart: 2.625,
      paddingInline: 2,
      border: '1px solid',
      borderColor: 'divider',
      borderTopLeftRadius: (theme) => theme.shape.borderRadius,
      borderTopRightRadius: (theme) => theme.shape.borderRadius,
      borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
      borderBottomRightRadius: (theme) => theme.shape.borderRadius,
      backgroundColor: 'grey.900',
      '&:hover, &:focus-within': {
        borderColor: 'transparent',
      },
      '&:hover': {
        background: (theme) =>
          `linear-gradient(${theme.palette.grey[900]}, ${
            theme.palette.grey[900]
          }) padding-box, linear-gradient(90deg, ${alpha(
            theme.palette.primary.main,
            0.4,
          )} 0%, ${alpha(theme.palette.primary.dark, 0.4)} 100%) border-box;`,
      },
      '&:focus-within': {
        background: (theme) =>
          `linear-gradient(${theme.palette.grey[900]}, ${theme.palette.grey[900]}) padding-box, linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%) border-box;`,
      },
    },
    inputProps,
  };

export const disabledTokenInputStyleProps: Partial<
  ComponentProps<typeof TokenInput>
> = {
  sx: {
    paddingBlock: 2.5,
    paddingBlockStart: 2.625,
    paddingInline: 2,
    border: '1px solid',
    borderColor: 'divider',
    borderTopLeftRadius: (theme) => theme.shape.borderRadius,
    borderTopRightRadius: (theme) => theme.shape.borderRadius,
    borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
    borderBottomRightRadius: (theme) => theme.shape.borderRadius,
    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.2),
  },
  inputProps: {
    readOnly: true,
    ...inputProps,
  },
};
