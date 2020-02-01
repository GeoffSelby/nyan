const { getArgs } = require('../src');

describe('nyan <script>', () => {
  it('can run scripts with yarn syntax when using npm', () => {
    expect(getArgs(['build'], 'npm')).toEqual(['run', 'build']);
  });

  it('can run scripts with yarn syntax and extra flags when using npm', () => {
    expect(getArgs(['test', '--watch'], 'npm')).toEqual([
      'run',
      'test',
      '--watch',
    ]);
  });

  it('can run scripts with yarn syntax when using yarn', () => {
    expect(getArgs(['build'], 'yarn')).toEqual(['build']);
  });

  it('can run scripts with yarn syntax and extra flags when using yarn', () => {
    expect(getArgs(['test', '--watch'], 'yarn')).toEqual(['test', '--watch']);
  });

  it('can run scripts with npm syntax when using npm', () => {
    expect(getArgs(['run', 'build'], 'npm')).toEqual(['run', 'build']);
  });

  it('can run scripts with npm syntax and extra flags when using npm', () => {
    expect(getArgs(['run', 'test', '--watch'], 'npm')).toEqual([
      'run',
      'test',
      '--watch',
    ]);
  });

  it('can run scripts with npm syntax when using yarn', () => {
    expect(getArgs(['run', 'build'], 'yarn')).toEqual(['build']);
  });

  it('can run scripts with npm syntax and extra flags when using yarn', () => {
    expect(getArgs(['run', 'test', '--watch'], 'yarn')).toEqual([
      'test',
      '--watch',
    ]);
  });
});
