import { DEV, PACKAGENAME } from '@moneko/core/build';
import type { PartialConfigType } from '@moneko/core';

const conf: PartialConfigType = {
  devtool: DEV ? 'eval-cheap-module-source-map' : false,
  routeBaseName: `/${PACKAGENAME}/`,
  publicPath: `/${PACKAGENAME}/`,
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    meta: {
      light: {
        name: 'theme-color',
        content: '#5794ff',
        // media: '(prefers-color-scheme: light)',
      },
      // dark: {
      //   name: 'theme-color',
      //   content: '#4d81dc',
      //   media: '(prefers-color-scheme: dark)',
      // },
    },
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
