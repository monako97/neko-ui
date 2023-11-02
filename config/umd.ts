import { type ConfigType, paths } from '@moneko/core';

const conf: Partial<ConfigType> = {
  devtool: false,
  htmlPluginOption: false,
  entry: `${paths.programPath}/components/index.ts`,
  bar: {
    fancy: false,
  },
  output: {
    path: `${paths.programPath}/umd`,
    filename: 'index.js',
    library: {
      name: 'NekoUI',
      type: 'umd',
      umdNamedDefine: true,
    },
  },
  bundleAnalyzer: false,
  splitChunk: false,
  runtimeChunk: false,
};

export default conf;
