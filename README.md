# nyan

`nyan` is a CLI, inspired by [narn](https://github.com/joeldenning/narn), that detects what package manager your current project is using. If `package-lock.json` exists, it will spawn `npm` commands. If `yarn.lock` exists, `yarn` is used. Unlike [narn](https://github.com/joeldenning/narn), `nyan` allows you to use whichever syntax you prefer. Prefer `npm`? Use `npm` commands and arguments. Yarn user? Use `yarn` commands and arguments. It's up to you, all commands will be translated to the correct syntax automatically.

## Getting Started

### Installation

```sh
# Using npm
npm intsall -g @geoffcodesthings/nyan

# Using yarn
yarn global add @geoffcodesthings/nyan
```

### Configuration

There is only one configuration option, `preferredManager`. By default, it is set to `yarn`.

To change this, run:

```sh
nyan config set preferredManager npm
```

> Available options for `preferredManager` are `yarn` and `npm`.

## Usage

### Yarn-like syntax

```sh
# Install from package.json
nyan

# Add a new dependency
nyan add lodash

# Add a dev dependency
nyan add --dev jest
nyan add -D jest

# To remove a dependency
nyan remove lodash

# Run a script from the package.json
nyan test
nyan dev --watch

# Apply version bump
nyan version <newversion>

# Publish to registry
nyan publish

# Upgrade dependencies
nyan upgrade
nyan upgrade --latest

# View the installed version of nyan
nyan -v
nyan --version
```

### NPM-like syntax

```sh
# Install from package.json
nyan install

# Add a new dependency
nyan install lodash
nyan install --save lodash

# Add a dev dependency
nyan install --save-dev jest
nyan install -D jest

# To remove a dependency
nyan uninstall lodash

# Run a script from the package.json
nyan run test
nyan run dev --watch

# Apply version bump
nyan version <newversion>

# Publish to registry
nyan publish

# Upgrade dependencies
nyan update

# View the installed version of nyan
nyan -v
nyan --version
```

## Contributing

There is plenty of room for improvement (support for more commands, global installation support, .etc). Contributions are open. If you have an idea for improvement, please submit an issue with a feature proposal first for discussion. Bug fixes can be PR'd directly. Be sure to write tests for any new features and make sure all tests pass before submitting any PR.
