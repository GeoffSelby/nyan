const { getArgs } = require('../src');

describe('nyan init', () => {
  it('can init when using npm', () => {
    expect(getArgs(['init'], 'npm')).toEqual(['init']);
  });

  it('can init when using yarn', () => {
    expect(getArgs(['init'], 'yarn')).toEqual(['init']);
  });
});
