import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    'libs/shared/data-access/src/generated/graphql.ts': {
      schema: process.env.VITE_SUBSQUID_URL,
      documents: ['**/src/**/*.graphql'],
      plugins: ['typescript'],
    },
    '.': {
      schema: process.env.VITE_SUBSQUID_URL,
      documents: ['**/src/**/*.graphql'],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: '~@origin/shared/data-access',
      },
      hooks: { afterOneFileWrite: ['prettier --write', 'eslint --fix'] },
      plugins: ['typescript-operations', 'typescript-react-query'],
      config: {
        fetcher: {
          func: '@origin/shared/data-access#graphqlClient',
        },
      },
    },
  },
};

export default config;
