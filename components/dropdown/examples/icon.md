---
title: 带图标的选项
description: 给每一项添加独特的图标
order: 6
---

```html
<n-dropdown>
  <n-button>带图标的选项</n-button>
</n-dropdown>
<script>
  const el = container.querySelector('n-dropdown');

  el.items = [
    { label: '狮子', value: '狮子', icon: '🦁' },
    { label: '大青蛙', value: '大青蛙', icon: '🐸' },
  ];
</script>
```

```jsx
<n-dropdown
  items={[
    { label: '狮子', value: '狮子', icon: '🦁' },
    { label: '大青蛙', value: '大青蛙', icon: '🐸' },
  ]}
>
  <n-button>带图标的选项</n-button>
</n-dropdown>
```
