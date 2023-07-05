---
title: 垂直排列
description: 通过设置 `vertical` 属性来使用垂直排列
order: 4
---

```html
<n-radio layout="vertical"></n-radio>
<script>
  const el = container.querySelector('n-radio');

  el.options = ['React', 'Vue', 'SolidJS', 'Flutter'];
  el.value = 'Vue';
</script>
```

```jsx
<n-radio layout="vertical" value="Vue" options={['React', 'Vue', 'SolidJS', 'Flutter']} />
```
