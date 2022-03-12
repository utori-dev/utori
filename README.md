# `@utori-dev/template-simple-typescript-library`

Simple and imperfect template for a TypeScript library.

## Overview

This template allows you to create a simple TypeScript library.

It includes basic configurations for [Prettier](prettier), [Jest](jest), and [TypeScript][typescript].

## Getting Started

1. Clone the [template repository on GitHub][git_repo].\
   **Note**: If you are unsure on how to do this, see the
   [GitHub docs on creating repositories from templates][github_docs_template].
1. Update the following properties in `package.json`:
   - `name`: Update to your library's name.
   - `description`: Update to a description of your library.
   - `repository.url`: Update to your GitHub repository.
   - `bugs.url`: Update to your GitHub repository.
   - `homepage`: Update to your project's homepage.
1. Update `README.md` to describe your library.
1. Update `LICENSE` to be appropriate for your project.
1. Update `.prettierrc.yaml`, `jest.config.json`, and `tsconfig.json` as desired.\
   See the information below on configuring these tools.

## Configuration

### Prettier (`.prettierrc.yaml`)

This project includes a `.prettierrc.yaml` configuration for [Prettier][prettier].
You may not need to modify this at all.

See the [documentation for configuring Prettier][prettier_docs_config].

### Jest (`jest.config.json`)

This project includes a starter `jest.config.json` configuration for [Jest][jest].

You will probably want to configure this to include the appropriate [`testEnvironment`][jest_docs_config_testenvironment].

See the [documentation for configuring Jest][jest_docs_config].

### TypeScript (`tsconfig.json`)

This project includes a starter `tsconfig.json` configuration for [TypeScript][typescript].
You can [read more about what a `tsconfig.json` file in the TypeScript handbook][typescript_docs_config].

You will probably want to configure the `tsconfig.json` to include the appropriate [`lib`][typescript_ref_config_lib] values.

For other values, see the [official `tsconfig.json` reference][typescript_ref_config].

### Release

To configure the released package, you will need to modify the `scripts/pre-release.js` script.

In the `createDistributionPackage` function, you can modify the options used to generate the release.

## Creating a Release

To publish your package on the [NPM registry][npmjs], you can run `npm run release` in the root directory.

It is wise to do a dry run before actually publishing. You can do this with `npm run release -- --dry-run`.

[git_repo]: https://github.com/utori-dev/template-simple-typescript-library
[github_docs_template]: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template
[jest]: https://jestjs.io/
[jest_docs_config]: https://jestjs.io/docs/configuration
[jest_docs_config_testenvironment]: https://jestjs.io/docs/configuration#testenvironment-string
[npmjs]: https://www.npmjs.com/
[prettier]: https://prettier.io/
[prettier_docs_config]: https://prettier.io/docs/en/configuration.html
[typescript]: https://www.typescriptlang.org/
[typescript_docs_config]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
[typescript_ref_config]: https://www.typescriptlang.org/tsconfig
[typescript_ref_config_lib]: https://www.typescriptlang.org/tsconfig#lib
