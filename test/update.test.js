const { getArgs } = require('../src');

describe('nyan update', () => {
  it('can update packages when using npm', () => {
    expect(getArgs(['update'], 'npm')).toEqual(['update']);
  });

  it('can update packages when using yarn', () => {
    expect(getArgs(['update'], 'yarn')).toEqual(['upgrade']);
  });
});
