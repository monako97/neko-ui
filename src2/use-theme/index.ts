import { useEffect, useState, useCallback } from 'react';

export interface ThemeTypes {
  type: 'light' | 'dark';
}

// eslint-disable-next-line no-unused-vars
type UseThemeType = [ThemeTypes['type'], (type: ThemeTypes['type']) => void];

const themeMedia = window.matchMedia('(prefers-color-scheme: light)');
/**
 * 主题 hooks
 * @returns {UseThemeTypes} theme and setTheme
 */
const useTheme = (): UseThemeType => {
  const [theme, setTheme] = useState<ThemeTypes['type']>(themeMedia.matches ? 'light' : 'dark');
  const handleTheme = useCallback(
    ({ matches }: { matches: boolean }) => {
      const type = matches ? 'light' : 'dark';

      setTheme(type);
    },
    [setTheme]
  );

  const changeTheme = useCallback(
    (color: ThemeTypes['type']) => {
      handleTheme({ matches: color === 'light' });
    },
    [handleTheme]
  );

  useEffect(() => {
    themeMedia.addEventListener('change', handleTheme);
    return () => {
      themeMedia.removeEventListener('change', handleTheme);
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
