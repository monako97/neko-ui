---
title: 基本使用
description: 最简单的用法
order: 1
---

```html
<n-radio></n-radio>
<script>
  const el = container.querySelector('n-radio');

  el.options = ['React', 'Vue', 'SolidJS', 'Flutter'];
  el.value = 'Vue';
</script>
```

```jsx
<n-radio options={['React', 'Vue', 'SolidJS', 'Flutter']} />
```
