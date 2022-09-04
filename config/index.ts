import type { PartialConfigType } from 'plugin-runtime';
import { PACKAGENAME, DEV } from 'plugin-runtime/build/process-env';

const conf: PartialConfigType = {
  publicPath: DEV ? 'auto' : `/${PACKAGENAME}/`,
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
  },
  prefixCls: PACKAGENAME,
  modifyVars: {},
  miniIdc: false,
  designSize: 1920,
  minifier: {
    type: 'terser',
  },
  routerMode: 'hash',
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
    // prismjs: {
    //   transform: ({ name, source }) => {
    //     console.log({ name, source });
    //     return `${source}/es/icons/${name}`;
    //   },
    // },
  },
  rulesInclude: {
    css: ['katex'],
    media: ['katex'],
    fonts: ['katex'],
  },
};

export default conf;
