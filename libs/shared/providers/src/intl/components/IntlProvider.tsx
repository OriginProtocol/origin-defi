import { useRef } from 'react';

import { Typography } from '@mui/material';
import { IntlProvider as OriginalIntlProvider } from 'react-intl';

import type { Children } from '@origin/shared/utils';
import type { MessageFormatElement } from 'react-intl';

interface IntlProviderProps extends Children {
  messages: Record<
    string,
    Record<string, string> | Record<string, MessageFormatElement[]>
  >;
}

export const IntlProvider = ({ children, messages }: IntlProviderProps) => {
  const language = typeof window !== 'undefined' ? navigator?.language : 'en';
  const lang = language?.substring(0, 2)?.toLowerCase() ?? 'en';
  const mess = messages[lang] ?? messages['en'];
  const warn = useRef(import.meta.env.DEV);

  const handleError = (e: Error) => {
    if (warn.current) {
      console.warn(
        `Missing translations! While this is normal during development, don't forget to run i18n-compile to generate the locales.`,
      );
      warn.current = false;
    }
  };

  return (
    <OriginalIntlProvider
      locale={language}
      messages={mess}
      defaultLocale="en"
      textComponent={Typography}
      onError={handleError}
      wrapRichTextChunksInFragment
      defaultRichTextElements={{
        p: (chunks) => <p>{chunks}</p>,
        b: (chunks) => <b>{chunks}</b>,
        br: () => <br />,
        strong: (chunks) => <strong>{chunks}</strong>,
      }}
    >
      {children}
    </OriginalIntlProvider>
  );
};
