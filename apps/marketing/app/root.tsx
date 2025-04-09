import './polyfills';

import { useContext } from 'react';

import { withEmotionCache } from '@emotion/react';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material';
import { ClientStyleContext } from '@origin/marketing/shared';
import { IntlProvider } from '@origin/shared/providers';
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { messages } from './lang';
import styles from './styles.css?url';

import type { Children } from '@origin/shared/utils';
import type { LinksFunction } from '@remix-run/node';
import type { ReactNode } from 'react';

type DocumentProps = {
  children: ReactNode;
  title?: string;
};

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    href: '/fonts/dm-sans.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/inter.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/jetbrains-mono.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: styles,
  },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
];

export const Layout = withEmotionCache(
  ({ children }: Children, emotionCache) => {
    const clientStyleData = useContext(ClientStyleContext);

    useEnhancedEffect(() => {
      emotionCache.sheet.container = document.head;
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (emotionCache.sheet as any)._insertTag(tag);
      });
      clientStyleData.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
          <meta
            name="emotion-insertion-point"
            content="emotion-insertion-point"
          />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  },
);

export default function App() {
  return (
    <IntlProvider messages={messages}>
      <Outlet />
    </IntlProvider>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <IntlProvider messages={messages}>
          <Link to="/" className="btn px-4 py-2">
            Back home
          </Link>
        </IntlProvider>
        <Scripts />
      </body>
    </html>
  );
}
