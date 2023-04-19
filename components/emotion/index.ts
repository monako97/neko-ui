import createEmotion from '@emotion/css/create-instance';
import { prefixer } from 'stylis';
import px2rem from 'stylis-px2rem-plugin';

export const {
  css,
  cx,
  flush,
  hydrate,
  injectGlobal,
  keyframes,
  sheet,
  cache,
  merge,
  getRegisteredStyles,
} = createEmotion({
  key: 'n',
  stylisPlugins: [px2rem(), prefixer],
});
