import * as React from 'react';

import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material';
import { theme } from '@origin/shared/theme';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import type { Preview } from '@storybook/react';

export const decorators: Preview['decorators'] = [
  (StoryComponent) => {
    return (
      <CssVarsProvider theme={theme} defaultMode="dark">
        <MemoryRouter>
          <IntlProvider messages={{}} locale="en" defaultLocale="en">
            <StoryComponent />
          </IntlProvider>
        </MemoryRouter>
      </CssVarsProvider>
    );
  },
];

const preview: Preview = {
  decorators,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#141519',
        },
      ],
    },
  },
};

export default preview;
