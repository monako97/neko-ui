[TOC]

# @moneko/request

## 设置响应拦截器、请求前缀

```typescript
// @/services/index.ts
import { extend } from '@moneko/request';
export { request } from '@moneko/request';

extend({
  interceptor: {
    response: (resp) => resp,
  },
  prefixUrl: '/api',
});

```

## 调用request案例

```typescript
import { request } from '@/services';

export const getApi = () => request('/metrics');
export const postApi = (params = {}) => request('/metrics', { data: params, method: 'POST' });

```
