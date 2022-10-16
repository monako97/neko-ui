module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: require('@moneko/postcss').plugins.concat(require('cssnano')()),
};
