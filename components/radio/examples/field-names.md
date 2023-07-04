---
title: 自定义字段
description: 自定义节点 `label`、`value`、`options` 的字段
order: 5
---

```html
<n-radio value="b"></n-radio>
<script>
  const el = container.querySelector('n-radio');

  el.options = [
    { code: 'a', name: '选项-1' },
    { code: 'b', name: '选项-2' },
    { code: 'c', name: '选项-3' },
    { code: 'd', name: '选项-4' },
  ];
  el.fieldNames = {
    label: 'name',
    value: 'code',
  };
</script>
```

```jsx
<n-radio
  value="b"
  field-names={{
    label: 'name',
    value: 'code',
  }}
  options={[
    { code: 'a', name: '选项-1' },
    { code: 'b', name: '选项-2' },
    { code: 'c', name: '选项-3' },
    { code: 'd', name: '选项-4' },
  ]}
/>
```
