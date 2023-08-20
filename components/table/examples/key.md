---
title: 自定义取值
description: 通过 `key` 指定取值
---

```html
<n-table></n-table>
<script>
  const el = container.querySelector('n-table');

  el.columns = { name: '用户名', age: '年龄', 自定义: { key: 'age' } };
  el.data = [
    { name: 'user 1', age: 18 },
    { name: 'user 2', age: 19 },
    { name: 'user 3', age: 3 },
  ];
</script>
```

```jsx
<n-table
  columns={{ name: '用户名', age: '年龄', 自定义: { key: 'age' } }}
  data={[
    { name: 'user 1', age: 18 },
    { name: 'user 2', age: 19 },
    { name: 'user 3', age: 3 },
  ]}
/>
```
