---
title: 基本使用
description: 最简单的使用方式, 默认选中第一项。
order: 1
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
    };
  })}
/>
```
