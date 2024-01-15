import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    'libs/governance/shared/src/generated/graphql.ts': {
      schema: process.env.VITE_SUBSQUID_URL,
      documents: [
        'libs/governance/**/src/**/*.graphql',
        '!libs/governance/proposals/src/snapshot.graphql',
      ],
      plugins: ['typescript'],
      config: {
        scalars: {
          BigInt: 'string',
          DateTime: 'string',
        },
      },
    },
    'libs/governance/': {
      schema: process.env.VITE_SUBSQUID_URL,
      documents: [
        'libs/governance/**/src/**/*.graphql',
        '!libs/governance/proposals/src/snapshot.graphql',
      ],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: '~@origin/governance/shared',
      },
      plugins: ['typescript-operations', 'typescript-react-query'],
      config: {
        reactQueryVersion: 5,
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
    'libs/governance/proposals/src/snapshot.generated.ts': {
      schema: process.env.VITE_SNAPSHOT_URL,
      documents: 'libs/governance/proposals/src/snapshot.graphql',
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
          func: '@origin/governance/shared#snapshotGraphqlClient',
        },
      },
    },
  },
};

export default config;
