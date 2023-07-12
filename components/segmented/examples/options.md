---
title: 单独配置
description: 单独配置标题和值
order: 2
---

```html
<n-segmented default-value="3"></n-segmented>
<script>
  const el = container.querySelector('n-segmented');

  el.options = ['HTML', 'CSS', { value: 3, label: 'TypeScript' }, 'Dart', 'Swift', 'Rust'];
</script>
```

```jsx
<n-segmented
  default-value={3}
  options={['HTML', 'CSS', { value: 3, label: 'TypeScript' }, 'Dart', 'Swift', 'Rust']}
/>
```
