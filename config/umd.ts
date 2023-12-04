import { type ConfigType, resolveProgramPath } from '@moneko/core';

const conf: Partial<ConfigType> = {
  devtool: false,
  htmlPluginOption: false,
  entry: resolveProgramPath('components/index.ts'),
  bar: false,
  output: {
    path: resolveProgramPath('umd'),
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
