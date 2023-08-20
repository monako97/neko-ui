---
title: 序号
description: 添加序号到第一列
---

```html
<n-table></n-table>
<script>
  const el = container.querySelector('n-table');

  el.columns = { order: { type: 'order' }, name: '用户名', age: '年龄' };
  el.data = [
    { name: 'user 1', age: 18 },
    { name: 'user 2', age: 19 },
    { name: 'user 3', age: 3 },
  ];
</script>
```

```jsx
<n-table
  columns={{ order: { type: 'order' }, name: '用户名', age: '年龄' }}
  data={[
    { name: 'user 1', age: 18 },
    { name: 'user 2', age: 19 },
    { name: 'user 3', age: 3 },
  ]}
/>
```
