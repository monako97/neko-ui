---
title: 基本使用
description: 基本使用
order: 1
---

```html
<n-checkbox label="启用"></n-checkbox>
<n-checkbox default-value="B"></n-checkbox>
<script>
  const el = container.querySelectorAll('n-checkbox');

  el[0].onchange = function (e) {
    console.log(e.detail);
  };
  el[1].options = ['A', 'B', 'C', 'D'];
  el[1].onchange = function (e) {
    console.log(e.detail);
  };
</script>
```

```jsx
<n-checkbox
  default-value={['B']}
  options={['A', 'B', 'C', 'D']}
  onChange={(e) => {
    console.log(e.detail);
  }}
/>
```
