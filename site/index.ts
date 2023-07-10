import { lazy } from 'solid-js';
import { routes } from '@moneko/solid-js';
import { type RouteDefinition } from '@solidjs/router';
import 'n-code-live';
import 'n-katex';

const router: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import(/* webpackChunkName: "layout" */ '@/layout')),
    children: [
      {
        path: '/',
        component: lazy(() => import(/* webpackChunkName: "about" */ '@/about')),
      },
      ...routes,
    ],
  },
];

export default router;
