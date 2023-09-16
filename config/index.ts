import type { ConfigType } from '@moneko/core';

const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    tags: [
      {
        tag: 'script',
        src: 'https://cdn.statically.io/gh/monako97/cdn/main/npm/%40webcomponents/webcomponentsjs/2.8.0/webcomponents-loader.js',
      },
      {
        tag: 'script',
        src: 'https://cdn.statically.io/gh/monako97/cdn/main/npm/n-katex/1.0.8/umd/index.js',
      },
      {
        tag: 'script',
        src: 'https://cdn.statically.io/gh/monako97/cdn/main/npm/n-code-live/1.0.6/umd/index.js',
      },
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

if (process.env.NODE_ENV === 'production') {
  conf.prefixJsLoader = [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        plugins: ['@moneko/css/babel'],
      },
    },
  ];
}

export default conf;
