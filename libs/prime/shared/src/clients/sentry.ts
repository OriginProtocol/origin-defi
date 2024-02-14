import { isNilOrEmpty } from '@origin/shared/utils';
import {
  captureException,
  globalHandlersIntegration,
  init,
} from '@sentry/react';

export const registerSentry = () => {
  if (!isNilOrEmpty(import.meta.env.VITE_SENTRY_DSN)) {
    init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      enableTracing: false,
      defaultIntegrations: false,
      integrations: [
        globalHandlersIntegration({
          onerror: false,
          onunhandledrejection: false,
        }),
      ],
    });
    console.log('Sentry initialized');
  }
};

export const trackSentryError = (error: Error) => {
  captureException(error);
};
