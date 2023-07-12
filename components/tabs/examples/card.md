---
title: 卡片式标签页
description: 另一种样式的页签
order: 6
---

```html
<n-tabs type="card"></n-tabs>
<script>
  const el = container.querySelector('n-tabs');

  el.items = new Array(3).fill(0).map((_, i) => {
    return {
      value: i + 1,
      label: `Tab ${i + 1}`,
      content: `Content of Tab Pane ${i + 1}`,
    };
  });
</script>
```

```jsx
<n-tabs
  type="card"
  items={new Array(3).fill(0).map((_, i) => {
    return {
      value: i + 1,
      label: `Tab ${i + 1}`,
      content: `Content of Tab Pane ${i + 1}`,
    };
  })}
/>
```
