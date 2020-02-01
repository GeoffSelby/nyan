const { getArgs } = require('../src');

describe('nyan remove', () => {
  it('can uninstall packages when using npm', () => {
    expect(getArgs(['remove', 'lodash', 'moment'], 'npm')).toEqual([
      'uninstall',
      'lodash',
      'moment',
    ]);
  });

  it('can remove packages when using yarn', () => {
    expect(getArgs(['remove', 'lodash', 'moment'], 'yarn')).toEqual([
      'remove',
      'lodash',
      'moment',
    ]);
  });
});
