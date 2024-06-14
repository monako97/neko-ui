import type { ConfigType } from '@moneko/core';

const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    meta: {
      CSP: {
        'http-equiv': 'Content-Security-Policy',
        content: "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      },
      'google-site-verification': 'gmDerloN7NoGvGSeX5M-tWX4SHXJ5XdXvA5bO2oZL5Y',
    },
  },
  rem: {
    designSize: 1920,
  },
  fallbackCompPath: '@/components/fallback',
  bundleAnalyzer: {},
  importOnDemand: {
    '@moneko/common': {
      transform: 'esm/${member}',
    },
  },
};

export default conf;
