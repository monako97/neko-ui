import { act, renderHook } from '@testing-library/react';
import useTheme from '../index';
/**
 * @jest-environment jsdom
 */
describe('test useTheme', () => {
  const mockMatchMedia = (matches: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: matches,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  };

  it('light', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useTheme());
    const {
      current: [theme, changeTheme],
    } = result;

    expect(theme).toBe('light');
    act(() => {
      changeTheme('dark');
    });
    act(() => {
      changeTheme('light');
    });
  });
  it('dark', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useTheme());
    const {
      current: [theme],
    } = result;

    expect(theme).toBe('dark');
  });
  it('changeTheme', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useTheme());
    const { current } = result;

    act(() => {
      current[1]('dark');
    });
    act(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
    act(() => {
      current[1]('light');
    });
    act(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });
});
