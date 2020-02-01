const { getArgs } = require('../src');

describe('nyan publish', () => {
  it('can publish to registry when using npm', () => {
    expect(getArgs(['publish'], 'npm')).toEqual(['publish']);
  });

  it('can publish to registry when using yarn', () => {
    expect(getArgs(['publish'], 'yarn')).toEqual(['publish']);
  });
});
