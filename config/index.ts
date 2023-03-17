import { DEV, PACKAGENAME, resolveProgramPath } from '@moneko/core/build';
import type { PartialConfigType } from '@moneko/core';

const fixBrowserRouter = {
  pathSegmentsToKeep: 1,
  // path: '404.html',
};
const conf: PartialConfigType = {
  seo: {
    domain: 'monako97.github.io',
    nojekyll: true,
    path: 'docs',
  },
  devtool: DEV ? 'eval-cheap-module-source-map' : false,
  routeBaseName: `/${PACKAGENAME}/`,
  publicPath: `/${PACKAGENAME}/`,
  output: resolveProgramPath(`/docs/${PACKAGENAME}/`),
  fixBrowserRouter: DEV ? false : fixBrowserRouter,
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    filename: '../index.html',
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
