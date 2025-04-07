/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
// import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => ({
  root: __dirname,
  build: {
    outDir: '../../dist/apps/marketing',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    sourcemap: true,
  },
  cacheDir: '../../node_modules/.vite/apps/marketing',

  server: {
    port: 4205,
    host: 'localhost',
    fs: {
      allow: ['../..'],
    },
  },

  preview: {
    port: 4305,
    host: 'localhost',
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
    react({
      babel: {
        compact: true,
        plugins: [
          [
            'formatjs',
            {
              idInterpolationPattern: '[sha512:contenthash:base64:6]',
              ast: true,
            },
          ],
        ],
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
    // sentryVitePlugin({
    //   org: 'origin-protocol',
    //   project: 'origin-unified-marketing',
    //   authToken: process.env.SENTRY_AUTH_TOKEN,
    //   telemetry: false,
    //   silent: true,
    //   sourcemaps: {
    //     filesToDeleteAfterUpload: [
    //       path.resolve(__dirname, '../../dist/apps/marketing/assets/*.map'),
    //     ],
    //   },
    // }),
  ],

  resolve: {
    alias: {
      '@formatjs/icu-messageformat-parser':
        '@formatjs/icu-messageformat-parser/no-parser',
    },
    conditions: ['mui-modern', 'module', 'browser', 'development|production'],
  },
}));
