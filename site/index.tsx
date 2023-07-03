import { lazy } from 'solid-js';
import { routes } from '@moneko/solid-js';
import { type RouteDefinition } from '@solidjs/router';

const router: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import(/* webpackChunkName: "pages/index" */ '@/pages/index')),
    children: [
      {
        path: '/',
        component: lazy(
          () => import(/* webpackChunkName: "components/about" */ '@/components/about')
        ),
      },
      ...routes,
    ],
  },
];

export default router;
