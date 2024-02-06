import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://squid.subsquid.io/origin-squid/v/v69420/graphql',
  documents: 'libs/prime/**/src/**/*.graphql',
  generates: {
    'libs/prime/shared/src/generated/graphql.ts': {
      schema: 'https://squid.subsquid.io/origin-squid/v/v69420/graphql',
      plugins: ['typescript'],
      config: {
        scalars: {
          BigInt: 'string',
          DateTime: 'string',
        },
      },
    },
    'libs/prime/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: '~@origin/prime/shared',
      },
      plugins: ['typescript-operations', 'typescript-react-query'],
      config: {
        exposeFetcher: true,
        exposeQueryKeys: true,
        fetcher: {
          func: '@origin/prime/shared#graphqlClient',
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
