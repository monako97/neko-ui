import { type ConfigType, isDev } from '@moneko/core';

const CDNHOST = 'https://cdn.statically.io';
const CDN = `${CDNHOST}/gh/monako97/cdn/main/npm`;

const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    meta: {
      CSP: {
        'http-equiv': 'Content-Security-Policy',
        content: `script-src 'self' ${CDNHOST} 'unsafe-eval' 'unsafe-inline'`,
      },
    },
    tags: [
      { src: `${CDN}/n-code-live/1.1.0/umd/index.js`, async: true },
      { inject: 'body', src: `${CDN}/n-katex/1.0.8/umd/index.js`, defer: true, async: true },
    ],
  },
  fallbackCompPath: '@/components/fallback',
  rem: {
    designSize: 1920,
  },
  bundleAnalyzer: {
    analyzerMode: 'static',
    reportFilename: 'report.html',
    openAnalyzer: false,
  },
  externals: [/(.+)\/__tests__\/(.+)/i],
  importOnDemand: {
    '@moneko/common': {
      transform: 'lib/${member}',
    },
    lodash: {
      transform: '${member}',
    },
  },
};

if (!isDev) {
  conf.prefixJsLoader = [
    {
      loader: 'babel-loader',
      options: {
        plugins: ['@moneko/css/babel'],
      },
    },
  ];
}

export default conf;
