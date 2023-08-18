[TOC]

# @moneko/request

> 数据请求

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

## 调用 request 案例

```typescript
import { request } from '@/services';

// 实际访问 /api/list
export const getApi = () => request('/list');
// 实际访问 /api/list
export const postApi = (params = {}) => request('/list', { data: params, method: 'POST' });
```
