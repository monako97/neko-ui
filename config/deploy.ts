import { PACKAGENAME, resolveProgramPath } from '@moneko/core/build';
import type { PartialConfigType } from '@moneko/core';

const conf: PartialConfigType = {
  devtool: false,
  seo: {
    domain: 'monako97.github.io',
    nojekyll: true,
    path: 'docs',
  },
  output: resolveProgramPath(`/docs/${PACKAGENAME}/`),
  htmlPluginOption: {
    filename: '../index.html',
  },
  fixBrowserRouter: {
    pathSegmentsToKeep: 1,
  },
};

export default conf;
