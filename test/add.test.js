const { getArgs } = require('../src');

describe('nyan add', () => {
  it('can install dependencies with npm', () => {
    expect(getArgs(['add', 'lodash'], 'npm').slice(0, 2)).toEqual([
      'install',
      '--save',
    ]);
  });

  it('can install multiple dependencies with npm', () => {
    expect(getArgs(['add', 'lodash', 'react', 'prop-types'], 'npm')).toEqual([
      'install',
      '--save',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
  });

  it('can install dev dependencies with npm', () => {
    expect(getArgs(['add', '-D', 'lodash'], 'npm').slice(0, 2)).toEqual([
      'install',
      '--save-dev',
    ]);
    expect(getArgs(['add', '--dev', 'lodash'], 'npm').slice(0, 2)).toEqual([
      'install',
      '--save-dev',
    ]);
    expect(getArgs(['add', 'lodash', '-D'], 'npm').slice(0, 2)).toEqual([
      'install',
      '--save-dev',
    ]);
    expect(getArgs(['add', 'lodash', '--dev'], 'npm').slice(0, 2)).toEqual([
      'install',
      '--save-dev',
    ]);
  });

  it('can install multiple dev dependencies with npm', () => {
    expect(
      getArgs(['add', '-D', 'lodash', 'react', 'prop-types'], 'npm'),
    ).toEqual([
      'install',
      '--save-dev',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
    expect(
      getArgs(['add', '--dev', 'lodash', 'react', 'prop-types'], 'npm'),
    ).toEqual([
      'install',
      '--save-dev',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
    expect(
      getArgs(['add', 'lodash', 'react', 'prop-types', '-D'], 'npm'),
    ).toEqual([
      'install',
      '--save-dev',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
    expect(
      getArgs(['add', 'lodash', 'react', 'prop-types', '--dev'], 'npm'),
    ).toEqual([
      'install',
      '--save-dev',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
  });

  it('can install dependencies with yarn', () => {
    expect(getArgs(['add', 'lodash'], 'yarn').slice(0, 2)).toEqual([
      'add',
      'lodash@latest',
    ]);
  });

  it('can install multiple dependencies with yarn', () => {
    expect(getArgs(['add', 'lodash', 'react', 'prop-types'], 'yarn')).toEqual([
      'add',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
  });

  it('can install dev dependencies with yarn', () => {
    expect(getArgs(['add', '-D', 'lodash'], 'yarn').slice(0, 2)).toEqual([
      'add',
      '-D',
    ]);
    expect(getArgs(['add', '--dev', 'lodash'], 'yarn').slice(0, 2)).toEqual([
      'add',
      '-D',
    ]);
    expect(getArgs(['add', 'lodash', '-D'], 'yarn').slice(0, 2)).toEqual([
      'add',
      '-D',
    ]);
    expect(getArgs(['add', 'lodash', '--dev'], 'yarn').slice(0, 2)).toEqual([
      'add',
      '-D',
    ]);
  });

  it('can install multiple dev dependencies with yarn', () => {
    expect(
      getArgs(['add', '-D', 'lodash', 'react', 'prop-types'], 'yarn'),
    ).toEqual([
      'add',
      '-D',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
    expect(
      getArgs(['add', '--dev', 'lodash', 'react', 'prop-types'], 'yarn'),
    ).toEqual([
      'add',
      '-D',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
    expect(
      getArgs(['add', 'lodash', 'react', 'prop-types', '-D'], 'yarn'),
    ).toEqual([
      'add',
      '-D',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
    expect(
      getArgs(['add', 'lodash', 'react', 'prop-types', '--dev'], 'yarn'),
    ).toEqual([
      'add',
      '-D',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
  });

  it('can install multiple dev dependencies with their semantic version specified', () => {
    expect(
      getArgs(['add', '-D', 'react@16.10.0', 'react-dom@^16.10.0'], 'npm'),
    ).toEqual(['install', '--save-dev', 'react@16.10.0', 'react-dom@^16.10.0']);
    expect(
      getArgs(['add', '--dev', 'react@16.10.0', 'react-dom@^16.10.0'], 'npm'),
    ).toEqual(['install', '--save-dev', 'react@16.10.0', 'react-dom@^16.10.0']);
    expect(
      getArgs(['add', 'react@16.10.0', 'react-dom@^16.10.0', '-D'], 'npm'),
    ).toEqual(['install', '--save-dev', 'react@16.10.0', 'react-dom@^16.10.0']);
    expect(
      getArgs(['add', 'react@16.10.0', 'react-dom@^16.10.0', '--dev'], 'npm'),
    ).toEqual(['install', '--save-dev', 'react@16.10.0', 'react-dom@^16.10.0']);
    expect(
      getArgs(['add', '-D', 'react@16.10.0', 'react-dom@^16.10.0'], 'yarn'),
    ).toEqual(['add', '-D', 'react@16.10.0', 'react-dom@^16.10.0']);
    expect(
      getArgs(['add', '--dev', 'react@16.10.0', 'react-dom@^16.10.0'], 'yarn'),
    ).toEqual(['add', '-D', 'react@16.10.0', 'react-dom@^16.10.0']);
    expect(
      getArgs(['add', 'react@16.10.0', 'react-dom@^16.10.0', '-D'], 'yarn'),
    ).toEqual(['add', '-D', 'react@16.10.0', 'react-dom@^16.10.0']);
    expect(
      getArgs(['add', 'react@16.10.0', 'react-dom@^16.10.0', '--dev'], 'yarn'),
    ).toEqual(['add', '-D', 'react@16.10.0', 'react-dom@^16.10.0']);
  });

  it('forces latest version when semantic version is omitted', () => {
    expect(getArgs(['add', 'lodash'], 'npm')).toEqual([
      'install',
      '--save',
      'lodash@latest',
    ]);
    expect(getArgs(['add', 'lodash'], 'yarn')).toEqual([
      'add',
      'lodash@latest',
    ]);
  });

  it('can install scoped packages', () => {
    expect(getArgs(['add', '@tailwindcss/custom-forms'], 'npm')).toEqual([
      'install',
      '--save',
      '@tailwindcss/custom-forms@latest',
    ]);
    expect(
      getArgs(['add', '@tailwindcss/custom-forms@~1.0.0'], 'npm'),
    ).toEqual(['install', '--save', '@tailwindcss/custom-forms@~1.0.0']);
    expect(getArgs(['add', '@tailwindcss/custom-forms'], 'yarn')).toEqual([
      'add',
      '@tailwindcss/custom-forms@latest',
    ]);
    expect(
      getArgs(['add', '@tailwindcss/custom-forms@~1.0.0'], 'yarn'),
    ).toEqual(['add', '@tailwindcss/custom-forms@~1.0.0']);
  });

  it('can install from https urls', () => {
    expect(
      getArgs(['add', 'https://github.com/GeoffSelby/nyan#master'], 'npm'),
    ).toEqual([
      'install',
      '--save',
      'https://github.com/GeoffSelby/nyan#master',
    ]);
    expect(
      getArgs(['add', 'https://github.com/GeoffSelby/nyan#master'], 'yarn'),
    ).toEqual(['add', 'https://github.com/GeoffSelby/nyan#master']);
  });

  it('can install from git urls', () => {
    expect(
      getArgs(['add', 'git@github.com:GeoffSelby/nyan.git#master'], 'npm'),
    ).toEqual([
      'install',
      '--save',
      'git@github.com:GeoffSelby/nyan.git#master',
    ]);
    expect(
      getArgs(['add', 'git@github.com:GeoffSelby/nyan.git#master'], 'yarn'),
    ).toEqual(['add', 'git@github.com:GeoffSelby/nyan.git#master']);
  });

  it('can install from file', () => {
    expect(getArgs(['add', 'file:../local-package'], 'npm')).toEqual([
      'install',
      '--save',
      '../local-package',
    ]);
    expect(getArgs(['add', 'file:../local-package'], 'yarn')).toEqual([
      'add',
      '../local-package',
    ]);
  });
});
