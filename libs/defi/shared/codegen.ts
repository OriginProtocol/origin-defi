import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    'libs/defi/shared/src/generated/graphql.ts': {
      schema: process.env.VITE_SUBSQUID_URL,
      documents: [
        'libs/defi/**/src/**/*.graphql',
        '!libs/defi/shared/src/queries/snapshot.graphql',
      ],
      plugins: ['typescript'],
      config: {
        scalars: {
          BigInt: 'string',
          DateTime: 'string',
        },
      },
    },
    'libs/defi/': {
      schema: process.env.VITE_SUBSQUID_URL,
      documents: [
        'libs/defi/**/src/**/*.graphql',
        '!libs/defi/shared/src/queries/snapshot.graphql',
      ],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: '~@origin/defi/shared',
      },
      plugins: ['typescript-operations', 'typescript-react-query'],
      config: {
        reactQueryVersion: 5,
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
    // Snapshot
    'libs/defi/shared/src/queries/snapshot.generated.ts': {
      schema: process.env.VITE_SNAPSHOT_URL,
      documents: 'libs/defi/shared/src/queries/snapshot.graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        reactQueryVersion: 5,
        exposeFetcher: true,
        exposeQueryKeys: true,
        fetcher: {
          func: '@origin/defi/shared#snapshotGraphqlClient',
        },
      },
    },
  },
};

export default config;
