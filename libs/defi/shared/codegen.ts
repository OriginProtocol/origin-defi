import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.VITE_SUBSQUID_URL,
  documents: 'libs/defi/**/src/**/*.graphql',
  generates: {
    'libs/defi/shared/src/generated/graphql.ts': {
      schema: process.env.VITE_SUBSQUID_URL,
      plugins: ['typescript'],
      config: {
        scalars: {
          BigInt: 'string',
          DateTime: 'string',
        },
      },
    },
    'libs/defi/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: '~@origin/defi/shared',
      },
      plugins: ['typescript-operations', 'typescript-react-query'],
      config: {
        exposeFetcher: true,
        exposeQueryKeys: true,
        fetcher: {
          func: '@origin/defi/shared#graphqlClient',
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
