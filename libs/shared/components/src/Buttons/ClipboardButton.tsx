import { useEffect, useState } from 'react';

import { Button, Typography } from '@mui/material';
import { FaCheckRegular, FaCircleXmarkRegular } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

import type { ButtonProps } from '@mui/material';
import type { MouseEvent } from 'react';

export type AddressType = 'address' | 'transaction';

export type ClipboardButtonProps = {
  value: string;
  hideIcon?: boolean;
} & ButtonProps;

export const ClipboardButton = ({
  value,
  hideIcon,
  ...rest
}: ClipboardButtonProps) => {
  const intl = useIntl();
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        setStatus('idle');
      }, 1000);
    }
  }, [status]);

  const handleCopyToClipboard = async (evt: MouseEvent<HTMLButtonElement>) => {
    if (value) {
      try {
        await navigator.clipboard.writeText(value);
        setStatus('copied');
      } catch {
        setStatus('error');
      }
    }
    rest?.onClick?.(evt);
  };

  return (
    <Button
      {...rest}
      onClick={handleCopyToClipboard}
      disabled={['copied', 'error'].includes(status) || rest?.disabled}
    >
      {status === 'idle' ? (
        rest?.children
      ) : status === 'copied' ? (
        <Typography
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          <FaCheckRegular color="success" sx={{ mr: 0.5 }} />
          {intl.formatMessage({ defaultMessage: 'Copied' })}
        </Typography>
      ) : (
        <Typography
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          <FaCircleXmarkRegular color="error" sx={{ mr: 0.5 }} />
          {intl.formatMessage({ defaultMessage: 'Error' })}
        </Typography>
      )}
    </Button>
  );
};
