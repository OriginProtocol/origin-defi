import type { Preview } from '@storybook/react';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material';
import { theme } from '@origin/shared/theme';

export const decorators: Preview['decorators'] = [
  (StoryComponent) => {
    return (
      // <CssVarsProvider theme={theme} defaultMode="dark">
      <IntlProvider messages={{}} locale="en" defaultLocale="en">
        <StoryComponent />
      </IntlProvider>
      // </CssVarsProvider>
    );
  },
];

const preview: Preview = {
  decorators,
};

export default preview;
