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

export default colorScheme;
