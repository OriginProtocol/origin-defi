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
  const lang = navigator.language.substring(0, 2).toLowerCase();
  const mess = messages[lang] ?? messages['en'];

  return (
    <OriginalIntlProvider
      locale={navigator.language}
      messages={mess}
      defaultLocale="en"
      textComponent={Typography}
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
