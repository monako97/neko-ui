import recommended from '@moneko/core/eslint/solid';

export default recommended.concat({
  ignores: ['**/**/*.mdx?', 'lib', 'docs', 'coverage', 'prism.js'],
});
