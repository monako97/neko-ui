---
title: 基本使用
description: 最简单的使用方式
order: 1
---

```html
<n-switch></n-switch>
<script>
  const el = container.querySelector('n-switch');

  el.onchange = function (e) {
    console.log('html', e.detail);
  };
</script>
```

```jsx
<n-switch
  onChange={(e) => {
    console.log('jsx', e.detail);
  }}
/>
```
