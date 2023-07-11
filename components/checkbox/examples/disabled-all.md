---
title: 禁用全部选项选项
description: 禁用全部选项选项
order: 3
---

```html
<n-checkbox value="1" disabled="true"></n-checkbox>
<script>
  const el = container.querySelector('n-checkbox');

  el.options = [
    { value: 1, label: '选项-1' },
    { value: 2, label: '选项-2' },
  ];
</script>
```

```tsx
<n-checkbox
  value={[1]}
  disabled
  options={[
    { value: 1, label: '选项-1' },
    { value: 2, label: '选项-2' },
  ]}
/>
```
