# Origin Defi

## Setup environment

Duplicate `.env` file to `.env.local` and fill the variables with your secrets, they will take precedence over the defaults.

> We use multiple `.env` files in the project: at the root for global settings and in `/apps/<APP_NAME>` folders for app scoped variables. They can be nested to increase specificity, more info [here](https://nx.dev/recipes/tips-n-tricks/define-environment-variables)

## Start the app

To start the development server run `pnpm nx serve <APP_NAME>`

## Apps

| Status | App Name   | Port | Public hosts |
|:------:|:-------------|:-----|:-------------|
|   ✅   | `oeth`       | 4200 | [aws](https://app.oeth.com/) [fleek](https://defi-oeth.on.fleek.co/)    |
|   ✅   | `ousd`       | 4201 | [aws](https://app.ousd.com/) [fleek](https://defi-ousd.on.fleek.co/)    |
|   🚧   | `defi`       | 4202 | [aws](https://next.drvhjg4vfr6lu.amplifyapp.com/)    |
|   ✅   | `governance` | 4203 | [aws](https://governance.ousd.com/)   |
|   🚧   | `prime`      | 4204 | [aws](https://next.d3ekvisba9ol3t.amplifyapp.com/#/restake)   |

## Storybook

There is a shared storybook aggregator that can run all the stories across all the libraries, run `pnpm storybook`. If you want to run storybook for one individual library (eg: ousd) simply run `pnpm nx storybook defi-oeth` (basically the command is `pnpm nx storybook name-of-the-lib`).

## Translations

After modifying a library or a module, you should run the according `i18-compile` script on the application project. There's a convenient `i18n` script at the root of the repo for running this on all apps.

## Running tasks

To execute tasks with Nx use the following syntax:

```bash
pnpm nx <target> <project> <...options>
```

You can also run multiple targets:

```bash
pnpm nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```bash
pnpm nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets are defined in the `apps/<APP_NAME>/projects.json` files. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

## graphQl

We use `react-query` in conjunction with `graphql-codegen` for interacting with graphQl endpoint. Here's how to use (this example is taken from oeth app):

- write gql colocated to your components, in respective `queries|mutations|subscriptions|fragments.graphql` file
- you get graphql autocompletion based on the schema located in `.graphqlconfig` at the root of the repo
- run the graphql-codegen task with `pnpm nx run oeth-shared:codegen-graphql`, it will generate
  - the global types in `libs/oeth/shared/src/generated/graphql.ts` and
  - the generated hooks next to your graphql file (i.e. `/libs/oeth/history/src/queries.generated.tsx`)
- use the generated hooks in your component with fully typed args and results

Couple of things to note:

- generated hooks receives args as first param, second param exposes all react-query api for controlling execution
- react-query http client is automatically injected via codegen, it is defined here `libs/oeth/shared/src/clients/graphql.ts`
- autocompletion is ensured by `.graphqlconfig`, you'll probably need the proper IDE plugin to handle it
- there's a `--watch` flag that you can pass to the codegen if you want to autodetect changes
