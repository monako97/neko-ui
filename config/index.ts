import type { ConfigType } from '@moneko/core';

const CDNHOST = 'https://cdn.statically.io https://img.picui.cn';
const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    meta: {
      CSP: {
        'http-equiv': 'Content-Security-Policy',
        content: `script-src 'self' ${CDNHOST} 'unsafe-eval' 'unsafe-inline' blob:;`,
      },
      'X-Content-Type-Options': 'nosniff',
      'google-site-verification': 'gmDerloN7NoGvGSeX5M-tWX4SHXJ5XdXvA5bO2oZL5Y',
    },
  },
  fallbackCompPath: '@/components/fallback',
  devServer: {
    https: true,
  },
};

export default conf;
