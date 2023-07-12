---
title: 居中
description: 标签居中展示。
order: 3
---

```html
<n-tabs centered="true"></n-tabs>
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
  centered={true}
  items={new Array(3).fill(0).map((_, i) => {
    return {
      value: i + 1,
      label: `Tab ${i + 1}`,
      content: `Content of Tab Pane ${i + 1}`,
    };
  })}
/>
```
