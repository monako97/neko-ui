import {
  type Accessor,
  type Setter,
  createEffect,
  createMemo,
  createRoot,
  createSignal,
  getOwner,
} from 'solid-js';
import { colorParse, mixColor, toneColor } from '@moneko/common';
import { CSSObject, css } from '@moneko/css';
export { toneColor } from '@moneko/common';

/** 生成主题色调
 * @param {string} base 基础颜色
 * @param {ThemeOption} option 配置项
 * @returns {Record<string, string>} 主题色调
 */
export function generateColor(base: string, option: ThemeOption): Record<string, string> {
  const obj = toneColor(base, option?.dark);
  const textColor = colorParse(obj[5]);
  const baseColor = colorParse(base);

  return {
    [`--${option.name}-text`]: textColor.setAlpha(0.65).toRgbaString(),
    [`--${option.name}-secondary`]: textColor.setAlpha(0.45).toRgbaString(),
    [`--${option.name}-heading`]: obj[5],
    [`--${option.name}-active`]: obj[30],
    [`--${option.name}-color`]: obj[40],
    [`--${option.name}-hover`]: mixColor(obj[40], obj[30], 15),
    [`--${option.name}-secondary-bg`]: obj[70],
    [`--${option.name}-border`]: obj[80],
    [`--${option.name}-outline`]: mixColor(obj[90], obj[40], 5),
    [`--${option.name}-selection`]: obj[90],
    [`--${option.name}-notify-bg`]: colorParse(obj[90]).setAlpha(0.8).toRgbaString(),
    [`--on-${option.name}-selection`]: obj[10],
    [`--${option.name}-shadow`]: baseColor.setAlpha(0.12).toRgbaString(),
    [`--${option.name}-shadow-1`]: baseColor.setAlpha(0.08).toRgbaString(),
    [`--${option.name}-shadow-2`]: baseColor.setAlpha(0.05).toRgbaString(),
    [`--${option.name}-details-bg`]: obj[95],
    [`--${option.name}-component-bg`]: obj[98],
    [`--${option.name}-bg`]: obj[99],
    [`--on-${option.name}-bg`]: obj[5],
  };
}

/** 颜色模式 */
export enum ColorScheme {
  /** 明亮 */
  light = 'light',
  /** 暗黑 */
  dark = 'dark',
  /** 跟随系统 */
  auto = 'auto',
}

function createTheme() {
  const baseTokens = css({
    ':root,:host': {
      '--scrollbar-size': '4px',
      '--font-size': '14px',
      '--font-size-sm': '12px',
      '--font-size-xs': '10px',
      '--font-size-lg': '16px',
      '--border-base': '1px solid var(--border-color)',
      '--border-radius': '8px',
      '--text-color': 'var(--primary-text)',
      '--text-secondary': 'var(--primary-secondary)',
      '--text-heading': 'var(--primary-heading)',
      '--text-selection': 'var(--primary-selection)',
      '--transition-duration': '0.3s',
      '--mask-bg': 'rgb(0 0 0 / 5%)',
      '--modal-component-bg': 'rgb(255 255 255 / 80%)',
      '--modal-box-shadow': '0 5px 35px rgb(0 0 0 / 10%)',
      '--notification-box-shadow': '0 4px 16px rgb(0 0 0 / 5%)',
      '--transition-timing-function': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      fontSize: 'var(--font-size)',
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', Helvetica, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans'",
      color: 'var(--text-color, rgb(0 0 0 / 65%))',
      lineHeight: 1.8,
    },
    '[disabled]:not([disabled="false"]):not(n-img)': {
      cursor: 'not-allowed',
      color: 'var(--disable-color)',
    },
    '::selection': {
      backgroundColor: 'var(--text-selection)',
    },
    '::-webkit-scrollbar': {
      inlineSize: 'var(--scrollbar-size)',
      blockSize: 'var(--scrollbar-size)',
    },
  });
  const preset =
    ColorScheme[localStorage.getItem('color-scheme') as keyof typeof ColorScheme] || 'auto';
  /** 检测 prefers-color-scheme 媒体查询是否为 light 模式 */
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const [scheme, setScheme] = createSignal<keyof typeof ColorScheme>(preset);
  const [isDark, setIsDark] = createSignal(media.matches);
  const [light, setLight] = createSignal({
    primary: '#5794ff',
    warning: '#faad14',
    error: '#ff4d4f',
    success: '#52c41a',
  });
  const [dark, setDark] = createSignal({
    primary: '#4d81dc',
    warning: '#bb8314',
    error: '#901c22',
    success: '#419418',
  });
  const primary = createMemo(() => generateColor(light().primary, { name: 'primary' }));
  const darkPrimary = createMemo(() =>
    generateColor(dark().primary, { name: 'primary', dark: true }),
  );
  const warning = createMemo(() => generateColor(light().warning, { name: 'warning' }));
  const darkWarning = createMemo(() =>
    generateColor(dark().warning, { name: 'warning', dark: true }),
  );
  const success = createMemo(() => generateColor(light().success, { name: 'success' }));
  const darkSuccess = createMemo(() =>
    generateColor(dark().success, { name: 'success', dark: true }),
  );
  const error = createMemo(() => generateColor(light().error, { name: 'error' }));
  const darkError = createMemo(() => generateColor(dark().error, { name: 'error', dark: true }));

  function getHostCss(tokens: CSSObject) {
    let str = '';

    for (const key in tokens) {
      if (Object.prototype.hasOwnProperty.call(tokens, key)) {
        str += `${key}:${tokens[key]};`;
      }
    }
    return `${baseTokens}:root,:host{${str}}`;
  }
  const lightCss = createMemo(() => {
    const tokens = Object.assign({}, primary(), warning(), success(), error(), {
      '--bg': 'transparent',
      '--disable-color': 'rgb(0 0 0 / 25%)',
      '--disable-bg': 'rgb(0 0 0 / 4%)',
      '--disable-border': '#d9d9d9',
      '--border-color': 'var(--primary-border)',
      '--component-bg': 'var(--primary-bg)',
    });

    return getHostCss(tokens);
  });
  const darkCss = createMemo(() => {
    const tokens = Object.assign({}, darkPrimary(), darkWarning(), darkSuccess(), darkError(), {
      '--bg': '#1c1c1c',
      '--disable-color': 'rgb(255 255 255 / 25%)',
      '--disable-bg': 'rgb(255 255 255 / 8%)',
      '--disable-border': '#424242',
      '--border-color': '#303030',
      '--component-bg': '#141414',
      '--primary-shadow': 'rgb(0 0 0 / 12%)',
      '--primary-selection': 'rgb(255 255 255 / 5%)',
      '--primary-details-bg': 'rgb(255 255 255 / 3%)',
      '--primary-component-bg': '#000',
      '--modal-component-bg': 'rgb(30 30 30 / 80%)',
    });

    return getHostCss(tokens);
  });

  function update(e: MediaQueryListEvent) {
    setIsDark(e.matches);
  }
  createEffect(() => {
    const _ = scheme();

    setIsDark(_ === 'dark' || (_ === 'auto' && media.matches));
  });
  const baseStyle = createMemo(() => (isDark() ? darkCss() : lightCss()));

  createEffect(() => {
    if (scheme() === 'auto') {
      // 监听 prefers-color-scheme 媒体查询变化，自动更新颜色方案
      media.addEventListener('change', update);
    } else {
      media.removeEventListener('change', update);
    }
    localStorage.setItem('color-scheme', scheme());
  });

  return {
    baseStyle,
    dark,
    setDark,
    light,
    setLight,
    scheme,
    setScheme,
    isDark,
  };
}

/** API */
export interface Theme {
  /** 亮色样式的主要色 */
  light: Accessor<Color>;
  /** 设置亮色样式的主要色 */
  setLight: Setter<Color>;
  /** 黑色样式的主要色 */
  dark: Accessor<Color>;
  /** 设置黑色样式的主要色 */
  setDark: Setter<Color>;
  /** 颜色模式
   * @default 'auto'
   */
  scheme: Accessor<keyof typeof ColorScheme>;
  /** 设置颜色模式 */
  setScheme: Setter<keyof typeof ColorScheme>;
  /** 是否为色模式 */
  isDark: Accessor<boolean>;
  /** 基本都样式表, 响应 scheme 变化 */
  baseStyle: Accessor<string>;
}

/** 主要色 */
interface Color {
  /** 主要
   * @default '#5794ff'
   */
  primary: string;
  /** 警告
   * @default '#faad14'
   */
  warning: string;
  /** 错误
   * @default '#ff4d4f'
   */
  error: string;
  /** 成功
   * @default '#52c41a'
   */
  success: string;
}

export interface ThemeOption {
  /** 是否采用暗色算法
   * @default false
   */
  dark?: boolean;
  /** 颜色名称 */
  name: string;
}

export default createRoot<Theme>(createTheme, getOwner());
