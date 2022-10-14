import { useEffect, useState, useCallback, useRef } from 'react';

export interface ThemeTypes {
  type: 'light' | 'dark';
}

// eslint-disable-next-line no-unused-vars
type UseThemeType = [ThemeTypes['type'], (type: ThemeTypes['type']) => void];

/**
 * 主题 hooks
 * @returns {UseThemeType} theme and setTheme
 */
const useTheme = (): UseThemeType => {
  const themeMedia = useRef(window.matchMedia('(prefers-color-scheme: light)'));
  const [theme, setTheme] = useState<ThemeTypes['type']>(() => {
    return themeMedia.current?.matches ? 'light' : 'dark';
  });
  const handleTheme = useCallback(({ matches }: { matches: boolean }) => {
    const type = matches ? 'light' : 'dark';

    setTheme(type);
  }, []);

  const changeTheme = useCallback(
    (color: ThemeTypes['type']) => {
      handleTheme({ matches: color === 'light' });
    },
    [handleTheme]
  );

  useEffect(() => {
    const mediaQueryList = themeMedia.current;

    themeMedia.current.addEventListener('change', handleTheme);
    return () => {
      mediaQueryList?.removeEventListener('change', handleTheme);
    };
  }, [handleTheme]);
  useEffect(() => {
    if (document.documentElement.getAttribute('data-theme') !== theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);
  return [theme, changeTheme];
};

export default useTheme;
