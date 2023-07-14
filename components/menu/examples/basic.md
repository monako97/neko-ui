---
title: 最简单的用法
order: 1
---

```html
<n-menu></n-menu>
<script>
  const el = container.querySelector('n-menu');

  el.items = ['A', 'B', { value: 'C', disabled: true }, 'D'];
</script>
```

```jsx
<n-menu items={['A', 'B', { value: 'C', disabled: true }, 'D']} />
```
