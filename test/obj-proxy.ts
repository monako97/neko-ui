export default new Proxy(
  {},
  {
    get: function getter(_, key) {
      if (key === '__esModule') {
        return false;
      }
      return key;
    },
  }
);
