import { colorParse, toneColor } from '@moneko/common';
import sso from 'shared-store-object';

/** 颜色方案枚举，支持的值为 'light' 或 'dark' */
export type ColorScheme = 'light' | 'dark';

/** 检测 prefers-color-scheme 媒体查询是否为 light 模式 */
const themeMedia = window.matchMedia('(prefers-color-scheme: light)');

/** 共享的颜色方案 */
const colorScheme = sso({
  /** 当前颜色方案 */
  scheme: (themeMedia?.matches ? 'light' : 'dark') as ColorScheme,
});

// 监听 prefers-color-scheme 媒体查询变化，自动更新颜色方案
themeMedia?.addEventListener('change', ({ matches }: { matches: boolean }) => {
  colorScheme.scheme = matches ? 'light' : 'dark';
});

export type ThemeOption = { dark?: boolean; name: string };

/** 获取主题色调
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

export default colorScheme;
