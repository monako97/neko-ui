---
title: 基本使用
description: 基本标签的用法，可以通过设置 `close-icon` 变为可关闭标签并自定义关闭按钮，设置为 true 时将使用默认关闭按钮
order: 1
---

```html
<n-tag>Tag 1</n-tag>
<n-tag close-icon="true">Close</n-tag>
<n-tag>Custom Close</n-tag>
<script>
  const el = container.querySelectorAll('n-tag');

  el[2].closeIcon = () => {
    const icon = document.createElement('span');
    icon.textContent = '⊖';
    return icon;
  };
</script>
```

```jsx
<n-tag>Tag 1</n-tag>
<n-tag close-icon={true}>Prevent Default</n-tag>
<n-tag close-icon={() => <span>⊖</span>}>
  Tag 2
</n-tag>
```
