import type { ConfigType } from '@moneko/core';

const CDNHOST = 'https://cdn.statically.io';
const CDN = `${CDNHOST}/gh/monako97/cdn/main/npm`;
const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    meta: {
      CSP: {
        'http-equiv': 'Content-Security-Policy',
        content: `script-src 'self' ${CDNHOST} 'unsafe-eval' 'unsafe-inline';`,
      },
      'X-Content-Type-Options': 'nosniff',
      'google-site-verification': 'gmDerloN7NoGvGSeX5M-tWX4SHXJ5XdXvA5bO2oZL5Y',
    },
    tags: [
      { inject: 'body', src: `${CDN}/n-code-live/1.1.0/umd/index.js`, async: true },
      { inject: 'body', src: `${CDN}/n-katex/1.0.8/umd/index.js`, async: true },
    ],
  },
  fallbackCompPath: '@/components/fallback',
  bundleAnalyzer: {},
  performance: {
    maxEntrypointSize: 512000,
  },
  importOnDemand: {
    '@moneko/common': {
      transform: 'esm/${member}',
    },
  },
};

export default conf;
