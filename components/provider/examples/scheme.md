---
title: 响应 scheme 变化
order: 1
---

```tsx
<n-provider
  onScheme={function (e: CustomEvent<'light' | 'dark' | 'auto'>) {
    console.log(`scheme change: ${e.detail};`);
  }}
>
  <span>试试点击左上角的图标切换主题, 查看控制台输出</span>
</n-provider>
```
