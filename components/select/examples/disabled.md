---
title: 不可用状态
description: 设置 `disabled` 属性禁用操作
order: 3
---

```html
<n-select default-value="B" disabled="true"></n-select>
<script>
  const el = container.querySelector('n-select');

  el.options = ['A', 'B', 'D'];
</script>
```

```jsx
<n-select default-value="B" disabled options={['A', 'B', 'D']} />
```
