import type { PartialConfigType } from '@moneko/core';
import { PACKAGENAME, DEV } from '@moneko/core/build/process-env';

const entryPath = DEV ? '/' : `/${PACKAGENAME}/`;
const conf: PartialConfigType = {
  devtool: DEV ? 'eval-cheap-module-source-map' : false,
  publicPath: entryPath,
  routeBaseName: entryPath,
  routerMode: 'hash',
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
  },
  modifyVars: {},
  miniIdc: false,
  designSize: 1920,
  importOnDemand: {
    antd: ['[source]/es/[name:-]', '[source]/es/[name:-]/style'],
    lodash: '[source]/[name]',
    '@ant-design/icons': {
      transform: ({ name, source }) => {
        if (name === 'createFromIconfontCN') {
          return `${source}/es/components/IconFont`;
        }
        return `${source}/es/icons/${name}`;
      },
    },
  },
};

export default conf;
