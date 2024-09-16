import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  ignoreNoDocuments: true,
  generates: {
    'libs/analytics/shared/src/generated/graphql.ts': {
      schema: process.env.VITE_SUBSQUID_URL,
      documents: ['libs/analytics/**/src/**/*.graphql'],
      plugins: ['typescript'],
      config: {
        scalars: {
          BigInt: 'string',
          DateTime: 'string',
        },
      },
    },
    'libs/analytics/': {
      schema: process.env.VITE_SUBSQUID_URL,
      documents: ['libs/analytics/**/src/**/*.graphql'],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: '~@origin/analytics/shared',
      },
      plugins: ['typescript-operations', 'typescript-react-query'],
      config: {
        reactQueryVersion: 5,
        exposeFetcher: true,
        exposeQueryKeys: true,
        fetcher: {
          func: '@origin/analytics/shared#graphqlClient',
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
