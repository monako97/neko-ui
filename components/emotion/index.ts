import createEmotion from '@emotion/css/create-instance';
import { prefixer } from 'stylis';
import px2rem from 'stylis-px2rem-plugin';
import { generateTheme } from '../color-scheme';

export const {
  css,
  cx,
  flush,
  hydrate,
  injectGlobal,
  keyframes,
  sheet,
  cache,
  merge,
  getRegisteredStyles,
} = createEmotion({
  key: 'n',
  stylisPlugins: [px2rem(), prefixer],
});

injectGlobal`
  :root {
    --font-size: 14px;
    --font-size-sm: 12px;
    --font-size-xs: 10px;
    --font-size-lg: 16px;
    --disable-color: rgb(0 0 0 / 25%);
    --disable-bg: rgb(0 0 0 / 4%);
    --disable-border: #d9d9d9;
    --border-base: 1px solid var(--border-color);
    --border-color: var(--primary-border);
    --border-radius: 8px;
    --component-bg: var(--primary-bg);
    --text-color: var(--primary-text);
    --text-secondary: var(--primary-secondary);
    --text-heading: var(--primary-heading);
    --text-selection: var(--primary-selection);
    --box-shadow-base: var(--primary-base-shadow);
    --transition-duration: 0.3s;
    --transition-timing-function: cubic-bezier(0.94, -0.1, 0.1, 1.2);
    ${generateTheme('#5794ff', { name: 'primary' })}
    ${generateTheme('#faad14', { name: 'warning' })}
    ${generateTheme('#ff4d4f', { name: 'error' })}
    ${generateTheme('#52c41a', { name: 'success' })}

   
  }
  [disabled]:not([disabled=false]) {
    cursor: not-allowed;
    color: var(--disable-color);
  }
  ::selection {
    background-color: var(--text-selection);
  }
  :root[data-theme='dark'] {
    --disable-color: rgb(255 255 255 / 25%);
    --disable-bg: rgb(255 255 255 / 8%);
    --disable-border: #424242;
    --border-color: #303030;
    ${generateTheme('#4d81dc', { name: 'primary', dark: true })}
    ${generateTheme('#bb8314', { name: 'warning', dark: true })}
    ${generateTheme('#901c22', { name: 'error', dark: true })}
    ${generateTheme('#419418', { name: 'success', dark: true })}
    --component-bg: #141414;
    --primary-shadow: rgb(0 0 0 / 12%);
    --primary-selection: rgb(255 255 255 / 5%);
    --primary-details-bg: rgb(255 255 255 / 5%);
    --primary-component-bg: #000;
  }
`;
