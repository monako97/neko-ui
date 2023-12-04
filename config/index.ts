import { type ConfigType, isDev } from '@moneko/core';

const baseUrl = 'https://cdn.statically.io/gh/monako97/cdn/main/npm';
const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    tags: [
      { tag: 'script', src: `${baseUrl}/n-code-live/1.0.8/umd/index.js` },
      { tag: 'script', src: `${baseUrl}/n-katex/1.0.8/umd/index.js` },
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
  buildHttp: {
    allowedUris: ['https://cdn.statically.io/'],
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
