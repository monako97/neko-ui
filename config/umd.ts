import { join } from 'path';
import { type ConfigType } from '@moneko/core';

const conf: Partial<ConfigType> = {
  devtool: false,
  htmlPluginOption: false,
  entry: join(process.cwd(), './components/index.ts'),
  polyfill: false,
  output: {
    path: join(process.cwd(), './umd'),
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
