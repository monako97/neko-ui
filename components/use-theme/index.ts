import { useState } from 'react';
import type { Dispatch } from 'react';

export interface ThemeTypes {
  type: 'light' | 'dark';
}

type UseThemeType = [ThemeTypes['type'], Dispatch<ThemeTypes['type']>];

/**
 * 主题 hooks
 * @returns {UseThemeTypes} theme and setTheme
 */
const useTheme = (): UseThemeType => {
  const [type, setType] = useState<ThemeTypes['type']>(
    window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  );

  return [type, setType];
};

export default useTheme;
