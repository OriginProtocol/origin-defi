import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../../../**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    'storybook-addon-pseudo-states',
    '@storybook/addon-interactions',
  ],
  staticDirs: [{ from: '../../assets/files', to: '/images' }],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: `${__dirname}/../vite.config.ts`,
      },
    },
  },
  typescript: {
    check: true,
    checkOptions: {
      typescript: {
        configFile: `${__dirname}/../tsconfig.storybook.json`,
      },
    },
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
