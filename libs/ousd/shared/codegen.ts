import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.VITE_SUBSQUID_URL,
  documents: 'libs/ousd/**/src/**/*.graphql',
  generates: {
    'libs/ousd/shared/src/generated/graphql.ts': {
      plugins: ['typescript'],
      config: {
        scalars: {
          BigInt: 'string',
          DateTime: 'string',
        },
      },
    },
    'libs/ousd/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: '~@origin/ousd/shared',
      },
      plugins: ['typescript-operations', 'typescript-react-query'],
      config: {
        reactQueryVersion: 5,
        exposeFetcher: true,
        exposeQueryKeys: true,
        fetcher: {
          func: '@origin/ousd/shared#graphqlClient',
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
