import { useCallback, useRef } from 'react';

import { Button, Link } from '@mui/material';
import { FaArrowDownToBracketRegular } from '@origin/shared/icons';
import { arrayToCsv } from '@origin/shared/utils';
import { useIntl } from 'react-intl';

import type { ButtonProps, SvgIconProps } from '@mui/material';

export type DownloadCsvButtonProps = {
  data?: (string | number)[][];
  filename?: `${string}.csv`;
  buttonLabel?: string;
  iconProps?: SvgIconProps;
  hideIcon?: boolean;
} & Omit<ButtonProps, 'onClick' | 'children'>;

export const DownloadCsvButton = ({
  data,
  filename = 'download.csv',
  buttonLabel,
  iconProps,
  hideIcon,
  disabled,
  ...rest
}: DownloadCsvButtonProps) => {
  const intl = useIntl();
  const link = useRef<HTMLAnchorElement>(null);

  const download = useCallback(() => {
    if (!data || !link?.current) {
      return;
    }
    link.current.href =
      'data:text/csv;charset=utf-8,' + encodeURI(arrayToCsv(data));
    link.current.click();
  }, [data]);

  return (
    <>
      <Link
        ref={link}
        sx={{ display: 'none' }}
        target="_blank"
        download={filename}
      ></Link>
      <Button
        size="small"
        {...rest}
        onClick={download}
        disabled={disabled || !data}
      >
        {!hideIcon && (
          <FaArrowDownToBracketRegular
            {...iconProps}
            sx={{ mr: 0.75, ...iconProps?.sx }}
          />
        )}
        {buttonLabel ?? intl.formatMessage({ defaultMessage: 'Download CSV' })}
      </Button>
    </>
  );
};
