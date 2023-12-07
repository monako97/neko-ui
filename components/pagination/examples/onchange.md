---
title: 受控
description: 当手动传入 `page` 时, 为受控模式
---

```html
<n-pagination page="1" page-size="10" total="85"></n-pagination>
<script>
  const el = container.querySelector('n-pagination');

  el.onchange = function (e) {
    const [page, size] = e.detail;
    e.target.page = page;
  };
</script>
```

```jsx
<n-pagination
  page={1}
  page-size={10}
  total={85}
  onChange={function (e) {
    const [page, size] = e.detail;
    e.target.page = page;
  }}
/>
```
