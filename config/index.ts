import type { ConfigType } from '@moneko/core';

const conf: Partial<ConfigType<'swc'>> = {
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    tags: [
      {
        tag: 'script',
        src: 'https://cdn.staticaly.com/gh/monako97/cdn/main/npm/n-katex/1.0.7/umd/index.js',
      },
      {
        tag: 'script',
        src: 'https://cdn.staticaly.com/gh/monako97/cdn/main/npm/n-code-live/1.0.4/umd/index.js',
      },
    ],
  },
  fallbackCompPath: '@/components/fallback',
  designSize: 1920,
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
        plugins: ['@moneko/css/babel'],
      },
    },
  ];
}

export default conf;
