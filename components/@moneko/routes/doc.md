[TOC]

# 约定式路由

> 通过内置的虚拟模块 @app/routes 获取约定式路由, 在编译期间动态生成,均采用懒加载;

1. 路由根据 `src/pages` 文件夹内的 `index.ts` 和 `index.tsx` 路径信息自动生成
2. 比如 `src/pages/user/index.tsx` 会生成一个 path 为 `/user/:id` 的路由
3. 文件夹名称以 `$` 开头将创建为动态路由
4. 比如 `src/pages/user/$id/index.tsx` 会生成一个 path 为 `/user/:id` 的动态路由

<div style="display:flex;gap: 16px;align-items:center;">

<div>

```treeview
项目根目录
`-- src
    `-- pages
        |-- user
        |   |-- $id
        |   |   `-- index.tsx
        |   `-- index.tsx
        `-- index.tsx
```

</div>

将创建出以下路由

1. `/`
2. `/user`
3. `/user/:id`

</div>

## 使用

> 或参考 [demo](https://github.com/monako97/demo-micro-app-solid)

## 读取路由数据

```ts
import routes from '@app/routes';

console.log(routes);
```

## 自定义路由

!> 当创建的约定式路由不足以满足您的需求时, 您可以通过创建 `src/router/index.ts` 来对其进行补充, 最终通过 `@app/routes` 获取的数据将是合并后的路由数据

```js
// src/router/index.ts
import { lazy } from 'solid-js';
import type { RouteConfig } from '@app/routes';

const router: RouteConfig[] = [
  {
    path: '/',
    // 补充路由
    component: lazy(() => import('@/layout')),
    children: [
      // 自定义路由
      {
        path: 'about',
        children: [
          {
            path: '/',
            component: lazy(() => import('@/pages/home')),
          },
        ],
      },
    ],
  },
];

export default router;
```

> React 应用与 Solid应用稍有差别, 具体可参考 [React demo](https://github.com/monako97/demo-micro-app-react) 和 [Solid demo](https://github.com/monako97/demo-micro-app-solid)
