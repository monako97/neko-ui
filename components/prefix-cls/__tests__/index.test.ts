import { prefixCls, setPrefixCls } from 'neko-ui';

/**
 * @jest-environment jsdom
 */

describe('prefixCls', () => {
  it('get', () => {
    expect(prefixCls('skeleton-paragraph')).toBe('n-skeleton-paragraph');
  });
  it('set', () => {
    expect(prefixCls('skeleton-paragraph')).toBe('n-skeleton-paragraph');

    setPrefixCls('neko');
    expect(prefixCls('skeleton-paragraph')).toBe('neko-skeleton-paragraph');
    setPrefixCls('a');
    expect(prefixCls('skeleton-paragraph')).toBe('a-skeleton-paragraph');
  });
});
