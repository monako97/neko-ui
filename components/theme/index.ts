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
import { css } from '@moneko/css';
export { toneColor } from '@moneko/common';

/** 生成主题色调
 * @param {string} base 基础颜色
 * @param {ThemeOption} option 配置项
 * @returns {Record<string, string>} 主题色调
 */
export function generateTheme(base: string, option: ThemeOption): Record<string, string> {
  const obj = toneColor(base, option?.dark);
  const textColor = colorParse(obj[5]);
  const baseColor = colorParse(base);

  return {
    [`--${option.name}-text`]: textColor.setAlpha(0.65).toRgbaString(),
    [`--${option.name}-secondary`]: textColor.setAlpha(0.45).toRgbaString(),
    [`--${option.name}-heading`]: obj[5],
    [`--${option.name}-active`]: obj[30],
    [`--${option.name}-color`]: obj[40],
    // [`--${option.name}-hover`]: obj[50],
    [`--${option.name}-hover`]: mixColor(obj[40], obj[30], 15),
    [`--${option.name}-secondary-bg`]: obj[70],
    [`--${option.name}-border`]: obj[80],
    // [`--${option.name}-outline`]: obj[90],
    [`--${option.name}-outline`]: mixColor(obj[90], obj[40], 5),
    [`--${option.name}-selection`]: obj[90],
    [`--on-${option.name}-selection`]: obj[10],
    [`--${option.name}-shadow`]: baseColor.setAlpha(0.12).toRgbaString(),
    [`--${option.name}-details-bg`]: obj[95],
    [`--${option.name}-component-bg`]: obj[98],
    [`--${option.name}-bg`]: obj[99],
    [`--on-${option.name}-bg`]: obj[5],
    [`--${option.name}-base-shadow`]: `0 3px 6px -4px ${baseColor
      .setAlpha(0.12)
      .toRgbaString()}, 0 6px 16px 0 ${baseColor
      .setAlpha(0.08)
      .toRgbaString()}, 0 9px 28px 8px ${baseColor.setAlpha(0.05).toRgbaString()}`,
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
  const primary = createMemo(() => generateTheme(light().primary, { name: 'primary' }));
  const warning = createMemo(() => generateTheme(light().warning, { name: 'warning' }));
  const success = createMemo(() => generateTheme(light().success, { name: 'success' }));
  const error = createMemo(() => generateTheme(light().error, { name: 'error' }));
  const lightCss = createMemo(() => {
    return css`
      :root,
      :host {
        ${primary()}
        ${warning()}
        ${success()}
        ${error()}
        --disable-color: rgb(0 0 0 / 25%);
        --disable-bg: rgb(0 0 0 / 4%);
        --disable-border: #d9d9d9;
        --border-color: var(--primary-border);
        --component-bg: var(--primary-bg);
      }
    `;
  });
  const darkPrimary = createMemo(() =>
    generateTheme(dark().primary, { name: 'primary', dark: true }),
  );
  const darkWarning = createMemo(() =>
    generateTheme(dark().warning, { name: 'warning', dark: true }),
  );
  const darkSuccess = createMemo(() =>
    generateTheme(dark().success, { name: 'success', dark: true }),
  );
  const darkError = createMemo(() => generateTheme(dark().error, { name: 'error', dark: true }));
  const darkCss = createMemo(() => {
    return css`
      :root,
      :host {
        ${darkPrimary()}
        ${darkWarning()}
        ${darkError()}
        ${darkSuccess()}
        --bg: #1c1c1c;
        --disable-color: rgb(255 255 255 / 25%);
        --disable-bg: rgb(255 255 255 / 8%);
        --disable-border: #424242;
        --border-color: #303030;
        --component-bg: #141414;
        --primary-shadow: rgb(0 0 0 / 12%);
        --primary-selection: rgb(255 255 255 / 5%);
        --primary-details-bg: rgb(255 255 255 / 3%);
        --primary-component-bg: #000;
      }
    `;
  });
  const baseCss = css`
    :root,
    :host {
      --font-size: 14px;
      --font-size-sm: 12px;
      --font-size-xs: 10px;
      --font-size-lg: 16px;
      --border-base: 1px solid var(--border-color);
      --border-radius: 8px;
      --text-color: var(--primary-text);
      --text-secondary: var(--primary-secondary);
      --text-heading: var(--primary-heading);
      --text-selection: var(--primary-selection);
      --box-shadow-base: var(--primary-base-shadow);
      --transition-duration: 0.3s;

      /* --transition-timing-function: cubic-bezier(0.94, -0.1, 0.1, 1.2); */
      --transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

      font-size: var(--font-size);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
        'Noto Color Emoji', Helvetica, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans';
      color: var(--text-color, rgb(0 0 0 / 65%));
      line-height: 1.8;
    }

    [disabled]:not([disabled='false']) {
      cursor: not-allowed;
      color: var(--disable-color);
    }

    ::selection {
      background-color: var(--text-selection);
    }

    ::-webkit-scrollbar {
      inline-size: 4px;
      block-size: 4px;
    }
  `;

  function update(e: MediaQueryListEvent) {
    setIsDark(e.matches);
  }
  createEffect(() => {
    const _ = scheme();

    setIsDark(_ === 'dark' || (_ === 'auto' && media.matches));
  });
  const baseStyle = createMemo(() => baseCss + (isDark() ? darkCss() : lightCss()));

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
