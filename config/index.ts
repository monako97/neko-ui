import { DEV, PACKAGENAME, resolveProgramPath } from '@moneko/core/build';
import type { PartialConfigType } from '@moneko/core';

const conf: PartialConfigType = {
  seo: {
    domain: 'monako97.github.io',
    nojekyll: true,
  },
  devtool: DEV ? 'eval-cheap-module-source-map' : false,
  routeBaseName: `/${PACKAGENAME}/`,
  publicPath: `/${PACKAGENAME}/`,
  output: resolveProgramPath(`/docs/${PACKAGENAME}/`),
  pathSegmentsToKeep: DEV ? false : 1,
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    meta: {
      light: {
        name: 'theme-color',
        content: '#5794ff',
        media: '(prefers-color-scheme: light)',
      },
      dark: {
        name: 'theme-color',
        content: '#4d81dc',
        media: '(prefers-color-scheme: dark)',
      },
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
