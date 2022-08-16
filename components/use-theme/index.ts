import { Dispatch, useState } from 'react';
import { getDefaultTheme } from '@pkg/index';

export interface ThemeTypes {
  type: 'light' | 'dark';
}

interface UseThemeTypes {
  type: ThemeTypes['type'];
  setType: Dispatch<ThemeTypes['type']>;
}

/**
 * 主题 hooks
 * @returns {UseThemeTypes} theme and setTheme
 */
const useTheme = (): UseThemeTypes => {
  const [type, setType] = useState<ThemeTypes['type']>(getDefaultTheme());

  return { type, setType };
};

export default useTheme;
