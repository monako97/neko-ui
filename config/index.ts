import type { PartialConfigType } from '@moneko/core';

const conf: PartialConfigType = {
  publicPath: './',
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    meta: {
      'theme-color': '#5794ff',
    },
  },
  fixBrowserRouter: {
    pathSegmentsToKeep: 0,
  },
  designSize: 1920,
  fallbackCompPath: '@/components/fallback',
  externals: [/(.+)\/__tests__\/(.+)/i],
  importOnDemand: {
    lodash: {
      transform: 'lodash/${member}',
    },
  },
};

export default conf;
