---
title: 基本使用
description: 最简单的使用方式
---

```html
<n-table></n-table>
<script>
  const el = container.querySelector('n-table');

  el.columns = { name: '用户名', age: '年龄' };
  el.data = [
    { name: 'user 1', age: 18 },
    { name: 'user 2', age: 19 },
    { name: 'user 3', age: 3 },
  ];
</script>
```

```jsx
<n-table
  columns={{ name: '用户名', age: '年龄' }}
  data={[
    { name: 'user 1', age: 18 },
    { name: 'user 2', age: 19 },
    { name: 'user 3', age: 3 },
  ]}
/>
```
