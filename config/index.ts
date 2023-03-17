import { DEV, PACKAGENAME } from '@moneko/core/build/process-env';
import type { PartialConfigType } from '@moneko/core';

const conf: PartialConfigType = {
  devtool: DEV ? 'eval-cheap-module-source-map' : false,
  routeBaseName: `/${PACKAGENAME}`,
  publicPath: `/${PACKAGENAME}`,
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
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
