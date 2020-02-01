const { getArgs } = require('../src');

describe('nyan install', () => {
  it('can install dependencies with npm', () => {
    expect(getArgs(['install', 'lodash'], 'npm').slice(0, 2)).toEqual([
      'install',
      '--save',
    ]);
  });

  it('can install multiple dependencies with npm', () => {
    expect(
      getArgs(['install', 'lodash', 'react', 'prop-types'], 'npm'),
    ).toEqual([
      'install',
      '--save',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
  });

  it('can install dev dependencies with npm', () => {
    expect(
      getArgs(['install', '--save-dev', 'lodash'], 'npm').slice(0, 2),
    ).toEqual(['install', '--save-dev']);
    expect(
      getArgs(['install', 'lodash', '--save-dev'], 'npm').slice(0, 2),
    ).toEqual(['install', '--save-dev']);
    expect(getArgs(['install', '-D', 'lodash'], 'npm').slice(0, 2)).toEqual([
      'install',
      '--save-dev',
    ]);
    expect(getArgs(['install', 'lodash', '-D'], 'npm').slice(0, 2)).toEqual([
      'install',
      '--save-dev',
    ]);
  });

  it('can install multiple dev dependencies with npm', () => {
    expect(
      getArgs(
        ['install', '--save-dev', 'lodash', 'react', 'prop-types'],
        'npm',
      ),
    ).toEqual([
      'install',
      '--save-dev',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
    expect(
      getArgs(
        ['install', 'lodash', 'react', 'prop-types', '--save-dev'],
        'npm',
      ),
    ).toEqual([
      'install',
      '--save-dev',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
    expect(
      getArgs(['install', '--D', 'lodash', 'react', 'prop-types'], 'npm'),
    ).toEqual([
      'install',
      '--save-dev',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
    expect(
      getArgs(['install', 'lodash', 'react', 'prop-types', '-D'], 'npm'),
    ).toEqual([
      'install',
      '--save-dev',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
  });

  it('can install dependencies with yarn', () => {
    expect(getArgs(['install', 'lodash'], 'yarn').slice(0, 2)).toEqual([
      'add',
      'lodash@latest',
    ]);
  });

  it('can install multiple dependencies with yarn', () => {
    expect(
      getArgs(['install', 'lodash', 'react', 'prop-types'], 'yarn'),
    ).toEqual(['add', 'lodash@latest', 'react@latest', 'prop-types@latest']);
  });

  it('can save dev dependencies with yarn', () => {
    expect(
      getArgs(['install', '--save-dev', 'lodash'], 'yarn').slice(0, 2),
    ).toEqual(['add', '-D']);
    expect(
      getArgs(['install', 'lodash', '--save-dev'], 'yarn').slice(0, 2),
    ).toEqual(['add', '-D']);
    expect(getArgs(['install', '-D', 'lodash'], 'yarn').slice(0, 2)).toEqual([
      'add',
      '-D',
    ]);
    expect(getArgs(['install', 'lodash', '-D'], 'yarn').slice(0, 2)).toEqual([
      'add',
      '-D',
    ]);
  });

  it('can install multiple dev dependencies with yarn', () => {
    expect(
      getArgs(
        ['install', '--save-dev', 'lodash', 'react', 'prop-types'],
        'yarn',
      ),
    ).toEqual([
      'add',
      '-D',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
    expect(
      getArgs(
        ['install', 'lodash', 'react', 'prop-types', '--save-dev'],
        'yarn',
      ),
    ).toEqual([
      'add',
      '-D',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
    expect(
      getArgs(['install', '-D', 'lodash', 'react', 'prop-types'], 'yarn'),
    ).toEqual([
      'add',
      '-D',
      'lodash@latest',
      'react@latest',
      'prop-types@latest',
    ]);
    expect(
      getArgs(['install', 'lodash', 'react', 'prop-types', '-D'], 'yarn'),
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
      getArgs(
        ['install', '--save-dev', 'react@16.10.0', 'react-dom@^16.10.0'],
        'npm',
      ),
    ).toEqual(['install', '--save-dev', 'react@16.10.0', 'react-dom@^16.10.0']);
    expect(
      getArgs(
        ['install', 'react@16.10.0', 'react-dom@^16.10.0', '--save-dev'],
        'npm',
      ),
    ).toEqual(['install', '--save-dev', 'react@16.10.0', 'react-dom@^16.10.0']);
    expect(
      getArgs(
        ['install', '--save-dev', 'react@16.10.0', 'react-dom@^16.10.0'],
        'yarn',
      ),
    ).toEqual(['add', '-D', 'react@16.10.0', 'react-dom@^16.10.0']);
    expect(
      getArgs(
        ['install', 'react@16.10.0', 'react-dom@^16.10.0', '--save-dev'],
        'yarn',
      ),
    ).toEqual(['add', '-D', 'react@16.10.0', 'react-dom@^16.10.0']);
  });

  it('forces latest version when semantic version is omitted', () => {
    expect(getArgs(['install', 'lodash'], 'npm')).toEqual([
      'install',
      '--save',
      'lodash@latest',
    ]);
    expect(getArgs(['install', 'lodash'], 'yarn')).toEqual([
      'add',
      'lodash@latest',
    ]);
  });

  it('works with scoped packages', () => {
    expect(getArgs(['install', '@tailwindcss/custom-forms'], 'npm')).toEqual([
      'install',
      '--save',
      '@tailwindcss/custom-forms@latest',
    ]);
    expect(
      getArgs(['install', '@tailwindcss/custom-forms@~1.0.0'], 'npm'),
    ).toEqual(['install', '--save', '@tailwindcss/custom-forms@~1.0.0']);
    expect(getArgs(['install', '@tailwindcss/custom-forms'], 'yarn')).toEqual([
      'add',
      '@tailwindcss/custom-forms@latest',
    ]);
    expect(
      getArgs(['install', '@tailwindcss/custom-forms@~1.0.0'], 'yarn'),
    ).toEqual(['add', '@tailwindcss/custom-forms@~1.0.0']);
  });

  it('can install from https urls', () => {
    expect(
      getArgs(['install', 'https://github.com/GeoffSelby/nyan#master'], 'npm'),
    ).toEqual([
      'install',
      '--save',
      'https://github.com/GeoffSelby/nyan#master',
    ]);
    expect(
      getArgs(['install', 'https://github.com/GeoffSelby/nyan#master'], 'yarn'),
    ).toEqual(['add', 'https://github.com/GeoffSelby/nyan#master']);
  });

  it('can install from git urls', () => {
    expect(
      getArgs(['install', 'git@github.com:GeoffSelby/nyan.git#master'], 'npm'),
    ).toEqual([
      'install',
      '--save',
      'git@github.com:GeoffSelby/nyan.git#master',
    ]);
    expect(
      getArgs(['install', 'git@github.com:GeoffSelby/nyan.git#master'], 'yarn'),
    ).toEqual(['add', 'git@github.com:GeoffSelby/nyan.git#master']);
  });

  it('can install from file', () => {
    expect(getArgs(['install', 'file:../local-package'], 'npm')).toEqual([
      'install',
      '--save',
      '../local-package',
    ]);
    expect(getArgs(['install', 'file:../local-package'], 'yarn')).toEqual([
      'add',
      '../local-package',
    ]);
  });

  it('defaults to npm install if no args are provided', () => {
    expect(getArgs([], 'npm')).toEqual(['install']);
  });

  it('works when install is specified', () => {
    expect(getArgs(['install'], 'npm')).toEqual(['install']);
  });
});
