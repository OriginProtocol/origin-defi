import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.VITE_SUBSQUID_URL,
  documents: 'libs/oeth/**/src/**/*.graphql',
  generates: {
    'libs/oeth/shared/src/generated/graphql.ts': {
      schema: process.env.VITE_SUBSQUID_URL,
      plugins: ['typescript'],
      config: {
        scalars: {
          BigInt: 'string',
          DateTime: 'string',
        },
      },
    },
    'libs/oeth/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: '~@origin/oeth/shared',
      },
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
