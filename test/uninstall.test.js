const { getArgs } = require('../src');

describe('nyan uninstall', () => {
  it('can uninstall packages when using npm', () => {
    expect(getArgs(['uninstall', 'lodash', 'moment'], 'npm')).toEqual([
      'uninstall',
      'lodash',
      'moment',
    ]);
  });

  it('can remove packages when using yarn', () => {
    expect(getArgs(['uninstall', 'lodash', 'moment'], 'yarn')).toEqual([
      'remove',
      'lodash',
      'moment',
    ]);
  });
});
