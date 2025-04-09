import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { vitePlugin as remix } from '@remix-run/dev';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  root: __dirname,
  build: {
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    sourcemap: true,
  },

  cacheDir: '../../node_modules/.vite/marketing',

  server: {
    port: 4006,
    hmr: true,
    fs: {
      allow: ['../..'],
    },
  },

  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      supported: {
        bigint: true,
      },
    },
  },

  plugins: [
    svgr(),
    remix({
      buildDirectory: '../../dist/apps/marketing',
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    nxViteTsPaths(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, '../../libs/shared/assets/*'),
          dest: './',
        },
      ],
    }),
    sentryVitePlugin({
      org: 'origin-protocol',
      project: 'origin-marketing',
      authToken: process.env.SENTRY_AUTH_TOKEN,
      telemetry: false,
      silent: true,
      sourcemaps: {
        filesToDeleteAfterUpload: [
          path.resolve(__dirname, '../../dist/apps/marketing/**/*.map'),
        ],
      },
    }),
  ],
});
