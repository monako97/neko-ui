---
title: 基本使用
description: 最简单的用法
order: 1
---

```html
<n-segmented></n-segmented>
<script>
  const el = container.querySelector('n-segmented');

  el.options = ['React', 'Vue', 'SolidJS', 'Flutter'];
  el.value = "Vue";
</script>
```

```jsx
<n-segmented value="Vue" options={['React', 'Vue', 'SolidJS', 'Flutter']} />
```
