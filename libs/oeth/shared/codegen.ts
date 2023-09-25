import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    'libs/oeth/shared/src/generated/graphql.ts': {
      schema: process.env.VITE_SUBSQUID_URL,
      documents: ['**/src/**/*.graphql'],
      plugins: ['typescript'],
      hooks: { afterOneFileWrite: ['prettier --write', 'eslint --fix'] },
    },
    'libs/oeth/': {
      schema: process.env.VITE_SUBSQUID_URL,
      documents: ['**/src/**/*.graphql'],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: '~@origin/oeth/shared',
      },
      hooks: { afterOneFileWrite: ['prettier --write', 'eslint --fix'] },
      plugins: ['typescript-operations', 'typescript-react-query'],
      config: {
        fetcher: {
          func: '@origin/oeth/shared#graphqlClient',
        },
      },
    },
  },
};

export default config;
