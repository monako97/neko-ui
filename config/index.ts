import type { PartialConfigType } from '@moneko/core';
import { DEV } from '@moneko/core/build/process-env';

const conf: PartialConfigType = {
  devtool: DEV ? 'eval-cheap-module-source-map' : false,
  publicPath: DEV ? '/' : './',
  routerMode: 'hash',
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
  },
  miniIdc: false,
  designSize: 1920,
  fallbackCompPath: '@/components/fallback',
  swcrc: {
    jsc: {
      experimental: {
        plugins: [
          [
            '@swc/plugin-transform-imports',
            {
              lodash: {
                transform: 'lodash/{{member}}',
              },
            },
          ],
        ],
      },
    },
  },
};

export default conf;
