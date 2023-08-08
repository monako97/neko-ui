---
title: 基本使用
description: 最简单的使用方式
order: 1
---

```html
<n-data-picker value="2023-08-30 09:41:32"></n-data-picker>
<script>
  const el = container.querySelector('n-data-picker');

  el.onchange = function (e) {
    e.target.value = e.detail[0];
  };
</script>
```

```jsx
<n-data-picker
  onChange={(e) => {
    console.log(e.detail);
  }}
/>
```
