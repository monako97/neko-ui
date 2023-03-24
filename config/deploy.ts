import { PACKAGENAME } from '@moneko/core/build';
import type { PartialConfigType } from '@moneko/core';

const conf: PartialConfigType = {
  devtool: false,
  seo: {
    domain: 'monako97.github.io',
    nojekyll: true,
  },
  routeBaseName: `/${PACKAGENAME}/`,
  publicPath: `/${PACKAGENAME}/`,
  bundleAnalyzer: false,
  fixBrowserRouter: {
    pathSegmentsToKeep: 1,
    path: '404.html',
  },
};

export default conf;
