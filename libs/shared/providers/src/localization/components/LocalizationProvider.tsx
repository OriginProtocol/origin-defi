import 'dayjs/locale/en';
import 'dayjs/locale/en-gb';

import { LocalizationProvider as OriginalLocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useIntl } from 'react-intl';

import type { Children } from '@origin/shared/utils';

export const LocalizationProvider = ({ children }: Children) => {
  const intl = useIntl();
  const locale = intl.locale === 'en-US' ? 'en' : 'en-gb';

  return (
    <OriginalLocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={locale}
    >
      {children}
    </OriginalLocalizationProvider>
  );
};
