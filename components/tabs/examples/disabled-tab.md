---
title: 禁用某一项。
description: 禁用某一项。
order: 2
---

```html
<n-tabs></n-tabs>
<script>
  const el = container.querySelector('n-tabs');

  el.items = new Array(3).fill(0).map((_, i) => {
    return {
      value: i + 1,
      label: `Tab ${i + 1}`,
      content: `Content of Tab Pane ${i + 1}`,
      disabled: i === 1,
    };
  });
</script>
```

```jsx
<n-tabs
  items={new Array(3).fill(0).map((_, i) => {
    return {
      value: i + 1,
      label: `Tab ${i + 1}`,
      content: `Content of Tab Pane ${i + 1}`,
      disabled: i === 1,
    };
  })}
/>
```
