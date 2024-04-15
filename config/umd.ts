import { type ConfigType, resolveProgram } from '@moneko/core';

const conf: Partial<ConfigType> = {
  devtool: false,
  htmlPluginOption: false,
  entry: resolveProgram('components/index.ts'),
  bar: false,
  output: {
    path: resolveProgram('umd'),
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
