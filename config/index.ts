import { type ConfigType, isDev } from '@moneko/core';

const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    meta: {
      keywords: 'neko-ui, neko ui, Neko UI, Web Components, UI libraries, solid-js Components',
    },
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
