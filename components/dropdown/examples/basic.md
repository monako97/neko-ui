---
title: 最简单的用法
order: 1
---

```html
<n-dropdown>hover</n-dropdown>
<script>
  const el = container.querySelector('n-dropdown');

  el.options = ['A', 'B', { value: 'C', disabled: true }, 'D'];
</script>
```

```jsx
<n-dropdown options={['A', 'B', { value: 'C', disabled: true }, 'D']}>hover</n-dropdown>
```
