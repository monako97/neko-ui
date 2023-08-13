import { lazy } from 'solid-js';
import type { RouteConfig } from '@app/routes';

const router: RouteConfig[] = [
  {
    path: '/',
    component: lazy(() => import(/* webpackChunkName: "layout" */ '@/layout')),
    children: [
      {
        path: '/',
        component: lazy(() => import(/* webpackChunkName: "home" */ '@/home')),
      },
    ],
  },
];

export default router;
