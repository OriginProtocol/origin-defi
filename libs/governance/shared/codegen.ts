import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.VITE_SUBSQUID_URL,
  documents: 'libs/governance/**/src/**/*.graphql',
  generates: {
    'libs/governance/shared/src/generated/graphql.ts': {
      schema: process.env.VITE_SUBSQUID_URL,
      plugins: ['typescript'],
      config: {
        scalars: {
          BigInt: 'string',
          DateTime: 'string',
        },
      },
    },
    'libs/governance/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: '~@origin/governance/shared',
      },
      plugins: ['typescript-operations', 'typescript-react-query'],
      config: {
        addInfiniteQuery: true,
        exposeFetcher: true,
        exposeQueryKeys: true,
        fetcher: {
          func: '@origin/governance/shared#graphqlClient',
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
