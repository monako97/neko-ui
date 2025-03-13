import eslint from '@moneko/eslint';
import solid from 'eslint-plugin-solid/configs/typescript';

const conf = [
  ...eslint.configs.recommended,
  { ignores: ['**/**/*.mdx?', 'lib', 'docs', 'coverage', 'prism.js'] },
];

export default conf.concat(solid);
