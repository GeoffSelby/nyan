const { getArgs } = require('../src');

describe('nyan upgrade', () => {
  it('can upgrade packages when using npm', () => {
    expect(getArgs(['upgrade'], 'npm')).toEqual(['update']);
  });

  it('can upgrade packages when using yarn', () => {
    expect(getArgs(['upgrade'], 'yarn')).toEqual(['upgrade']);
  });
});
