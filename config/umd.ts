import path from 'path';
import { type ConfigType } from '@moneko/core';

const conf: Partial<ConfigType<'swc'>> = {
  devtool: false,
  htmlPluginOption: false,
  entry: path.join(process.cwd(), './components/index.ts'),
  output: {
    path: path.resolve(process.cwd(), './lib'),
    filename: 'index.js',
    library: 'NekoUI',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  fixBrowserRouter: false,
  bundleAnalyzer: false,
  externals: [/(.+)\/__tests__\/(.+)/i, /(.+)\/examples\/(.+)/i],
  splitChunk: false,
  runtimeChunk: false,
};

export default conf;