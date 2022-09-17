import '@testing-library/jest-dom/extend-expect';

/* eslint-disable @typescript-eslint/no-empty-function */
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
