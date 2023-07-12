---
title: 只读模式
description: 禁止任何操作。
order: 8
---

```html
<n-tabs disabled="true"></n-tabs>
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
  disabled={true}
  items={new Array(3).fill(0).map((_, i) => {
    return {
      value: i + 1,
      label: `Tab ${i + 1}`,
      content: `Content of Tab Pane ${i + 1}`,
    };
  })}
/>
```
