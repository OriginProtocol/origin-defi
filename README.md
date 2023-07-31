# Origin Defi

## Start any the app

To start the development server run `nx serve ousd` or `nx serve oeth`. Open your browser and navigate to http://localhost:4200/. Happy coding!

## Storybook

There is a shared storybook aggregator that can run all the stories across all the libraries, run
`pnpm storybook`. If you want to run storybook for one individual library (eg: ousd) simply run `pnpm nx storybook defi-ousd` (basically the command is `pnpm nx storybook name-of-the-lib`).

## Translations

Basic translation setup was added to the repo. It might require some changes depending on how we would structure our translations and our modules, but for now it extracts and compiles translations available in the `apps` folder and the appropriate module in in `libs/defi/module-name`.

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

don't merge
