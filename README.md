# Origin Defi

This is a monorepo for Origin's DeFi applications, built using React and Nx. It contains several apps and libraries that share common code and configurations.

## Setup

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Duplicate `.env` file to `.env.local` and fill in the required variables
4. Start the development server with `pnpm nx serve <APP_NAME>`

> We use multiple `.env` files in the project: at the root for global settings and in `/apps/<APP_NAME>` folders for app scoped variables. They can be nested to increase specificity, more info [here](https://nx.dev/recipes/tips-n-tricks/define-environment-variables)

## Development

- To generate graphql files: `pnpm codegen`
- To compile translations: `pnpm i18n`
- To execute tasks with Nx: `pnpm nx <target> <project> <...options>`
- To run multiple targets: `pnpm nx run-many -t <target1> <target2>`
- To run targets for specific projects: `pnpm nx run-many -t <target1> <target2> -p <proj1> <proj2>`

## Apps

| Status | App Name   | Port | `main`  | `next`  |
|:------:|:-------------|:-----|:-------------|:-------------|
|   ✅   | `defi`       | 4200 | [aws](https://main.drvhjg4vfr6lu.amplifyapp.com/) [fleek](https://originprotocol.eth.limo/)    | [aws](https://next.drvhjg4vfr6lu.amplifyapp.com/)    
|   ✅   | `governance` | 4201 | [aws](https://governance.ousd.com/)   | [aws](https://next.d11mo0k0jspnpd.amplifyapp.com/)   
|   ✅   | `prime`      | 4202 | [aws](https://app.primestaked.com/)   | [aws](https://next.d3ekvisba9ol3t.amplifyapp.com/#/restake)   

## Libraries

The monorepo also includes several shared libraries, such as:

- `shared/assets`: Shared assets to be copied to every public app folders
- `shared/components`: Shared presentational components (only relying on theme and i18n contexts)
- `shared/utils`: Shared utility functions
- `shared/providers`: Shared context providers and components
- `shared/icons`: Shared SVG icons
- `shared/contracts`: Shared contracts constants and ABIs
- `shared/constants`: Shared constants
- `shared/routes`: Shared Swapper route configurations

## GraphQL

The project uses `react-query` and `graphql-codegen` for interacting with GraphQL endpoints. To use:

1. Write `.graphql` files colocated with your components
2. Run the codegen task: `pnpm nx run <APP_NAME>-shared:codegen-graphql`
3. Use the generated hooks in your components

> For convenience, there is a `pnpm codegen` script that generates all repository graphql documents.

## Styling

The project uses Emotion and Material-UI for styling. Each app has its own theme library (e.g., `defi/theme`, `prime/theme`) that defines the app's color palette, typography, and other design tokens.

## State Management

The project uses React context and hooks for state management. Shared providers are located in the `shared/providers` library, while app-specific providers are located in their respective app libraries.

## Routing

The project uses React Router for client-side routing. Route configurations are defined in the `routes.tsx` file of each app. Routes can also be colocated in their modules (e.g., `defi/`)

## Internationalization

The project uses `react-intl` for internationalization. Translation files are located in the `lang` directory of each app, and the `i18n` script compiles the translations for all apps.

> For convenience, there is a `pnpm i18n` script that extracts and generates all repository translation files.

## Deployment

Each app is deployed to AWS and Fleek, with separate `main` and `next` deployments. The deployment process is automated using GitHub Actions.
