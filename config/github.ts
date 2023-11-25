import { type ConfigType, PACKAGENAME, isDev } from '@moneko/core';

const conf: Partial<ConfigType> = {
  devtool: isDev ? 'eval-cheap-module-source-map' : false,
  bar: false,
  seo: {
    domain: 'monako97.github.io',
    nojekyll: true,
  },
  polyfill: false,
  basename: `/${PACKAGENAME}`,
  publicPath: `/${PACKAGENAME}/`,
  fixBrowserRouter: {
    pathSegmentsToKeep: 1,
    path: '404.html',
  },
};

export default conf;
