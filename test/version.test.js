const { getArgs } = require('../src');

describe('nyan version', () => {
  it('can apply version bump when using npm', () => {
    expect(getArgs(['version', 'patch'], 'npm')).toEqual(['version', 'patch']);
  });

  it('can apply version bump when using yarn', () => {
    expect(getArgs(['version', 'patch'], 'yarn')).toEqual(['version', 'patch']);
  });
});
