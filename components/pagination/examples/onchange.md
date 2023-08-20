---
title: 受控
description: 当手动传入 `page` 时, 为受控模式
---

```html
<n-pagination page="1" page-size="10" total="85"></n-pagination>
<script>
  const el = container.querySelector('n-pagination');

  el.onchange = function (e) {
    e.target.page = e.detail;
  };
</script>
```

```jsx
<n-pagination
  page={1}
  page-size={10}
  total={85}
  onChange={function (e) {
    e.target.page = e.detail;
  }}
/>
```
