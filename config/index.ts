import type { PartialConfigType } from 'plugin-runtime';
import { PACKAGENAME } from 'plugin-runtime/build/process-env';

const conf: PartialConfigType = {
  prefixCls: PACKAGENAME,
  modifyVars: {},
  miniIdc: false,
  designSize: 1920,
  minifier: {
    type: 'terser',
    css: 'cssnano',
  },
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
