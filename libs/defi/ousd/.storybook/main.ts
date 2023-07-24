const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: `${__dirname}/../../../shared/storybook/vite.config.ts`,
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
