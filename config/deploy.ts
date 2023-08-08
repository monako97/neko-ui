import { type ConfigType } from '@moneko/core';

const conf: Partial<ConfigType<'swc'>> = {
  devtool: false,
  bar: false,
  seo: {
    domain: 'monako97.github.io',
    nojekyll: true,
  },
  routeBaseName: '/neko-ui',
  publicPath: '/neko-ui/',
  bundleAnalyzer: false,
  cacheDirectory: false,
  fixBrowserRouter: {
    pathSegmentsToKeep: 1,
    path: '404.html',
  },
};

export default conf;
