import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dsv from '@rollup/plugin-dsv';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/dprice',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
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

  plugins: [react(), dsv(), svgr(), nxViteTsPaths()],

  build: {
    outDir: '../../dist/apps/dprice',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
