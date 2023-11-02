import { type ConfigType } from '@moneko/core';

const conf: Partial<ConfigType> = {
  devtool: false,
  bar: {
    fancy: false,
  },
  seo: {
    domain: 'monako97.github.io',
    nojekyll: true,
  },
  basename: '/neko-ui',
  publicPath: '/neko-ui/',
  fixBrowserRouter: {
    pathSegmentsToKeep: 1,
    path: '404.html',
  },
};

export default conf;
