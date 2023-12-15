import { type Component, lazy } from 'solid-js';
import type { RouteConfig } from '@app/routes';
import type { RouteSectionProps } from '@moneko/solid';

const router: RouteConfig[] = [
  {
    path: '/',
    component: lazy(
      () => import(/* webpackChunkName: "layout" */ '@/layout'),
    ) as unknown as Component<RouteSectionProps<unknown>>,
    children: [
      {
        path: '/',
        component: lazy(() => import(/* webpackChunkName: "home" */ '@/home')),
      },
    ],
  },
];

export default router;
