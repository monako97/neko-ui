import { myPkgs } from 'plugin-runtime';

export default [
  {
    path: '*',
    root: true,
    children: myPkgs,
  },
];
