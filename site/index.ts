import { lazy } from 'solid-js';
import routes from '@app/routes';
import { type RouteDefinition } from '@moneko/solid-js';

const router: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import(/* webpackChunkName: "layout" */ '@/layout')),
    children: [
      {
        path: '/',
        component: lazy(() => import(/* webpackChunkName: "home" */ '@/home')),
      },
      ...routes,
    ],
  },
];

export default router;
