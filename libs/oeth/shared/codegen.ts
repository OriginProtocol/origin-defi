import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    'libs/oeth/shared/src/generated/graphql.ts': {
      schema: process.env.VITE_SUBSQUID_URL,
      documents: ['**/src/**/*.graphql'],
      plugins: ['typescript'],
      hooks: { afterOneFileWrite: ['prettier --write', 'eslint --fix'] },
      config: {
        scalars: {
          BigInt: 'string',
          DateTime: 'string',
        },
      },
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
        exposeFetcher: true,
        exposeQueryKeys: true,
        fetcher: {
          func: '@origin/oeth/shared#graphqlClient',
        },
        scalars: {
          BigInt: 'string',
          DateTime: 'string',
        },
      },
    },
  },
};

export default config;
