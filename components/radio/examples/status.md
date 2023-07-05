---
title: 状态
description: radio提供5种内置的状态
order: 6
---

```html
<n-radio value="b"></n-radio>
<script>
  const el = container.querySelector('n-radio');

  el.options = [
    { value: 'a', label: '默认' },
    { value: 'b', label: '成功', status: 'success' },
    { value: 'c', label: '警告', status: 'warning' },
    { value: 'd', label: '错误', status: 'error' },
  ];
</script>
```

```jsx
<n-radio
  value="b"
  options={[
    { value: 'a', label: '默认' },
    { value: 'b', label: '成功', status: 'success' },
    { value: 'c', label: '警告', status: 'warning' },
    { value: 'd', label: '错误', status: 'error' },
  ]}
/>
```
