import getPrefixCls from '../index';

jest.mock('../index.less');
describe('test Button', () => {
  it('normal', () => {
    expect(getPrefixCls('ghost', 'neko')).toBe('neko-ghost');
  });
  it('not prefixCls', () => {
    expect(getPrefixCls('ghost')).toBe('neko-ghost');
    jest.clearAllMocks();
  });
});
