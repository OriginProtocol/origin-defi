import { LocalizationProvider as OriginalLocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enGB } from 'date-fns/locale/en-GB';
import { enUS } from 'date-fns/locale/en-US';
import { useIntl } from 'react-intl';

import type { Children } from '@origin/shared/utils';

export const LocalizationProvider = ({ children }: Children) => {
  const intl = useIntl();
  const locale = intl.locale === 'en-US' ? enUS : enGB;

  return (
    <OriginalLocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={locale}
    >
      {children}
    </OriginalLocalizationProvider>
  );
};
