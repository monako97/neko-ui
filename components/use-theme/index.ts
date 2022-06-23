import { Dispatch, useState } from 'react';

export interface ThemeTypes {
  type: 'light' | 'dark';
}

/**
 * 判断当前时间是晚上还是白天
 * @returns {string} light | dark
 */
export const getDefaultTheme = (): ThemeTypes['type'] => {
  let endTime: number | null = new Date().setHours(6, 0, 0, 0); // 当天6点
  let startTime: number | null = new Date().setHours(18, 0, 0, 0); // 当天18点
  let justNowTime: number | null = new Date().getTime(); // 现在
  let defaultTheme: ThemeTypes['type'] = 'light';

  if (justNowTime > endTime) {
    // 过了早上6点
    if (justNowTime > startTime) {
      // 过晚上6点，晚上
      defaultTheme = 'dark';
    } else {
      // 白天
      defaultTheme = 'light';
    }
  } else {
    // 还是晚上
    defaultTheme = 'dark';
  }

  endTime = null;
  startTime = null;
  justNowTime = null;
  return defaultTheme;
};

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
