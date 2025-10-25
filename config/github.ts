import { type ConfigType, isDev, PACKAGENAME } from '@moneko/core';

const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    publicPath: `/${PACKAGENAME}/`,
  },
  fallbackCompPath: '@/components/fallback',
  devtool: isDev ? 'eval-cheap-module-source-map' : false,
  seo: {
    domain: 'monako97.github.io',
    jekyll: false,
  },
  bar: false,
  basename: `/${PACKAGENAME}`,
  fixBrowserRouter: {
    pathSegmentsToKeep: 1,
    path: '404.html',
  },
};

export default conf;
