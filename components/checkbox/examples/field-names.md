---
title: 自定义字段名
description: 自定义节点 `label`、`value`、`options` 的字段
order: 6
---

```html
<n-checkbox></n-checkbox>
<script>
  const el = container.querySelector('n-checkbox');

  el.options = [
    { code: 1, name: '选项-1' },
    { code: 2, name: '选项-2' },
    { code: 3, name: '选项-3' },
  ];
  el.fieldNames = { label: 'name', value: 'code' };
  el.onchange = function (e) {
    el.value = e.detail;
  };
</script>
```

```jsx
<n-checkbox
  value={2}
  field-names={{
    label: 'name',
    value: 'code',
  }}
  options={[
    { code: 1, name: '选项-1' },
    { code: 2, name: '选项-2' },
    { code: 3, name: '选项-3' },
  ]}
  onChange={(e) => {
    e.target.value = e.detail;
  }}
/>
```
