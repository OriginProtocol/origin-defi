# Origin Defi

## Setup environment

Duplicate `apps/<YOUR_APP>/.env` file to `apps/<YOUR_APP>/.env.local` and fill the variables with your secrets, they will take precedence over the defaults.

## Start the app

To start the development server run `pnpm nx serve oeth` or `pnpm nx serve ousd`. Open your browser and navigate to http://localhost:4200/. Happy coding!

## Apps

| Status | Name | Nx project | Port | Public hosts |
|:------:|:-----|:-----------|:-----|:-------------|
|   🚧   | OETH | `oeth`     | 4200 | [fleek](https://defi-oeth.on.fleek.co/)    |
|   🚧   | OUSD | `ousd`     | 4201 | [fleek]()    |

## Storybook

There is a shared storybook aggregator that can run all the stories across all the libraries, run `pnpm storybook`. If you want to run storybook for one individual library (eg: ousd) simply run `pnpm nx storybook defi-ousd` (basically the command is `pnpm nx storybook name-of-the-lib`).

## Translations

Basic translation setup was added to the repo. It might require some changes depending on how we would structure our translations and our modules, but for now it extracts and compiles translations available in the `apps` folder and the appropriate module in in `libs/defi/module-name`.

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

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).
