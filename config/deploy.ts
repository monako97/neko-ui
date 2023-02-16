import { PACKAGENAME } from '@moneko/core/build/process-env';
import type { PartialConfigType } from '@moneko/core';

const conf: PartialConfigType = {
  devtool: false,
  publicPath: `/${PACKAGENAME}/`,
};

export default conf;
