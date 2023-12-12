/// <reference types="vitest" />
/// <reference types="vite-plugin-svgr/client" />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/ousd',

  server: {
    port: 4201,
    host: 'localhost',
  },

  preview: {
    port: 4301,
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

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
