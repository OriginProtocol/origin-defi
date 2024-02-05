/// <reference types="vite-plugin-svgr/client" />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  root: __dirname,
  build: {
    outDir: '../../dist/apps/prime',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  cacheDir: '../../node_modules/.vite/apps/prime',

  server: {
    port: 4204,
    host: 'localhost',
  },

  preview: {
    port: 4304,
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
          src: path.resolve(__dirname, '../../libs/shared/assets/files/**/*'),
          dest: './images',
        },
      ],
    }),
  ],

  resolve: {
    alias: {
      '@formatjs/icu-messageformat-parser':
        '@formatjs/icu-messageformat-parser/no-parser',
    },
  },
});
