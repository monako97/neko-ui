---
title: 动画
description: 添加切换动画
order: 9
---

```html
<n-tabs animated="true"></n-tabs>
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
  animated={true}
  items={new Array(3).fill(0).map((_, i) => {
    return {
      value: i + 1,
      label: `Tab ${i + 1}`,
      content: `Content of Tab Pane ${i + 1}`,
    };
  })}
/>
```
