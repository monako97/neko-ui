import { lazy } from 'solid-js';
import { type RouteDefinition, routes } from '@moneko/solid-js';

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
