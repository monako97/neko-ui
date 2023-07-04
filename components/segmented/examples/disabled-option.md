---
title: 禁用某个选项
description: 通过设置 `options` 中的 `disabled` 来禁用某个选项
order: 3
---

```html
<n-segmented value="1"></n-segmented>
<script>
  const el = container.querySelector('n-segmented');

  el.options = [
    { value: 1, label: '选项1' },
    { value: 2, label: '选项2', disabled: true },
    { value: 3, label: '选项3' },
  ];
</script>
```

```jsx
<n-segmented
  value={1}
  options={[
    { value: 1, label: '选项1' },
    { value: 2, label: '选项2', disabled: true },
    { value: 3, label: '选项3' },
  ]}
/>
```
