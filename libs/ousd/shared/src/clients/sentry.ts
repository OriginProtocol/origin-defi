import { isNilOrEmpty } from '@origin/shared/utils';
import * as Sentry from '@sentry/react';

export const registerSentry = () => {
  if (
    !isNilOrEmpty(import.meta.env.VITE_SENTRY_DSN) &&
    !isNilOrEmpty(import.meta.env.VITE_SENTRY_DSN.replace(' ', ''))
  ) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      enableTracing: false,
      defaultIntegrations: false,
      integrations: [
        new Sentry.Integrations.GlobalHandlers({
          onerror: false,
          onunhandledrejection: false,
        }),
      ],
    });
    console.log('Sentry initialized');
  }
};

export const trackSentryError = (error: Error) => {
  Sentry.captureException(error);
};
