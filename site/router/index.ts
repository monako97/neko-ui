import { myPkgs } from '@moneko/core';

export default [
  {
    path: '*',
    root: true,
    children: myPkgs,
  },
];
