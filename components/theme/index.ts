import { createMemo } from 'solid-js';
import { colorParse, toneColor } from '@moneko/common';
import { css } from '@moneko/css';
import { createStore } from 'solid-js/store';

/** 颜色方案枚举，支持的值为 'light' 或 'dark' */
export type ColorScheme = 'light' | 'dark';

/** 检测 prefers-color-scheme 媒体查询是否为 light 模式 */
const themeMedia = window.matchMedia('(prefers-color-scheme: light)');

/** 共享的颜色方案 */
export const [theme, setTheme] = createStore({
  scheme: (themeMedia?.matches ? 'light' : 'dark') as ColorScheme,
});

// 监听 prefers-color-scheme 媒体查询变化，自动更新颜色方案
themeMedia.addEventListener('change', ({ matches }: { matches: boolean }) => {
  setTheme('scheme', () => (matches ? 'light' : 'dark'));
});

export type ThemeOption = { dark?: boolean; name: string };

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
    [`--${option.name}-hover`]: obj[50],
    [`--${option.name}-secondary-bg`]: obj[70],
    [`--${option.name}-border`]: obj[80],
    [`--${option.name}-outline`]: obj[90],
    [`--${option.name}-selection`]: obj[90],
    [`--on-${option.name}-selection`]: obj[10],
    [`--${option.name}-shadow`]: baseColor.setAlpha(0.12).toHexaString(),
    [`--${option.name}-details-bg`]: obj[95],
    [`--${option.name}-component-bg`]: obj[98],
    [`--${option.name}-bg`]: obj[99],
    [`--on-${option.name}-bg`]: obj[5],
    [`--${option.name}-base-shadow`]: `0 3px 6px -4px ${baseColor
      .setAlpha(0.12)
      .toHexaString()}, 0 6px 16px 0 ${baseColor
      .setAlpha(0.08)
      .toHexaString()}, 0 9px 28px 8px ${baseColor.setAlpha(0.05).toHexaString()}`,
  };
}

const darkCss = css`
  :root,
  :host {
    ${generateTheme('#4d81dc', { name: 'primary', dark: true })}
    ${generateTheme('#bb8314', { name: 'warning', dark: true })}
    ${generateTheme('#901c22', { name: 'error', dark: true })}
    ${generateTheme('#419418', { name: 'success', dark: true })}
    --disable-color: rgb(255 255 255 / 25%);
    --disable-bg: rgb(255 255 255 / 8%);
    --disable-border: #424242;
    --border-color: #303030;
    --component-bg: #141414;
    --primary-shadow: rgb(0 0 0 / 12%);
    --primary-selection: rgb(255 255 255 / 5%);
    --primary-details-bg: rgb(255 255 255 / 5%);
    --primary-component-bg: #000;
    --skeleton-bg: rgb(255 255 255 / 6%);
    --skeleton-bg-active: linear-gradient(
        100deg,
        rgb(255 255 255 / 5%) 40%,
        rgb(255 255 255 / 15%) 50%,
        rgb(255 255 255 / 5%) 60%
      )
      transparent 180%/200% 100%;
    --segmented-bg: #000;
    --segmented-current-bg: #1f1f1f;
  }
`;
const lightCss = css`
  :root,
  :host {
    ${generateTheme('#5794ff', { name: 'primary' })}
    ${generateTheme('#faad14', { name: 'warning' })}
    ${generateTheme('#ff4d4f', { name: 'error' })}
    ${generateTheme('#52c41a', { name: 'success' })}
    --disable-color: rgb(0 0 0 / 25%);
    --disable-bg: rgb(0 0 0 / 4%);
    --disable-border: #d9d9d9;
    --border-color: var(--primary-border);
    --component-bg: var(--primary-bg);
    --skeleton-bg: rgb(0 0 0 / 6%);
    --skeleton-bg-active: linear-gradient(
        100deg,
        rgb(0 0 0 / 5%) 40%,
        rgb(0 0 0 / 15%) 50%,
        rgb(0 0 0 / 5%) 60%
      )
      transparent 180%/200% 100%;
    --segmented-bg: var(--primary-details-bg);
    --segmented-current-bg: #fff;
  }
`;
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
    --transition-timing-function: cubic-bezier(0.94, -0.1, 0.1, 1.2);
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

export const baseStyle = createMemo(() => {
  return baseCss + (theme.scheme === 'dark' ? darkCss : lightCss);
});
