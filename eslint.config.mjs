import recommended from '@moneko/eslint/solid';

export default recommended.concat({
  ignores: ['**/**/*.mdx?', 'lib', 'docs', 'coverage', 'prism.js'],
});
