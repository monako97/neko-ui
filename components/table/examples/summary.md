---
title: 求和
description: 通过 `summary` 设置需要求和的单元格
---

```html
<n-table align="center"></n-table>
<script>
  const el = container.querySelector('n-table');

  el.columns = {
    order: { type: 'order', width: 50 },
    name: '用户名',
    age: '年龄',
  };
  el.summary = ['age'];
  el.data = [
    { name: 'user 1', age: 18 },
    { name: 'user 2', age: 19 },
    { name: 'user 3', age: 3 },
  ];
</script>
```

```jsx
<n-table
  align="center"
  columns={{
    order: { type: 'order', width: 50 },
    name: '用户名',
    age: '年龄',
  }}
  summary={['age']}
  data={[
    { name: 'user 1', age: 18 },
    { name: 'user 2', age: 19 },
    { name: 'user 3', age: 3 },
  ]}
/>
```
