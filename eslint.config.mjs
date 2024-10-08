import neko from 'eslint-config-neko';
import solid from 'eslint-plugin-solid/configs/typescript';

const conf = [
  ...neko.configs.recommended,
  { ignores: ['**/**/*.mdx?', 'lib', 'docs', 'coverage', 'prism.js'] },
];

export default conf.concat(solid);
