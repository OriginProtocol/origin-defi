const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const nxEslintPlugin = require('@nx/eslint-plugin');
const eslintPluginFormatjs = require('eslint-plugin-formatjs');
const eslintPluginUnusedImports = require('eslint-plugin-unused-imports');
const eslintPluginSimpleImportSort = require('eslint-plugin-simple-import-sort');
const eslintPluginImport = require('eslint-plugin-import');
const eslintPluginPrettier = require('eslint-plugin-prettier');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    plugins: {
      '@nx': nxEslintPlugin,
      formatjs: eslintPluginFormatjs,
      'unused-imports': eslintPluginUnusedImports,
      'simple-import-sort': eslintPluginSimpleImportSort,
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
    },
  },
  ...compat
    .config({
      extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      rules: {
        ...config.rules,
        '@nx/enforce-module-boundaries': [
          'error',
          {
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
          },
        ],
        'react/react-in-jsx-scope': 'off',
        'no-empty': [
          'error',
          {
            allowEmptyCatch: true,
          },
        ],
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            varsIgnorePattern: '^_',
            args: 'none',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        'simple-import-sort/imports': [
          'warn',
          {
            groups: [
              ['^\\u0000'],
              ['^react(-dom(/client)?)?$'],
              ['^@?\\w'],
              ['^((?!\\u0000$)|/.*|$)'],
              ['^\\.'],
              ['^@?\\w.*\\u0000$'],
              ['^.*\\u0000$'],
              ['^\\..*\\u0000$'],
            ],
          },
        ],
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'react',
                importNames: ['default'],
              },
            ],
          },
        ],
        '@typescript-eslint/consistent-type-imports': 'error',
        'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        'formatjs/enforce-default-message': ['error', 'literal'],
        'formatjs/no-id': 'error',
        'formatjs/no-multiple-whitespaces': 'error',
        'formatjs/no-offset': 'error',
      },
    })),
  ...compat
    .config({
      extends: ['plugin:@nx/typescript'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        ...config.rules,
        'no-extra-semi': 'error',
      },
    })),
  ...compat
    .config({
      extends: ['plugin:@nx/typescript'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.generated.ts', '**/*.generated.tsx', 'graphql.ts'],
      rules: {
        ...config.rules,
        '@typescript-eslint/no-explicit-any': 'off',
        'no-extra-semi': 'error',
      },
    })),
  ...compat
    .config({
      extends: ['plugin:@nx/javascript'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
      rules: {
        ...config.rules,
        'no-extra-semi': 'error',
      },
    })),
  {
    ignores: [
      'dist',
      '**/*.generated.ts',
      '**/generated/graphql.ts',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
];
