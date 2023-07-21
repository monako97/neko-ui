---
title: 自定义字段名
description: 自定义节点 'label'、'value'、'options' 的字段
order: 5
---

```html
<n-select default-value="3" placeholder="请选择"></n-select>
<script>
  const el = container.querySelector('n-select');

  el.fieldNames = {
    label: 'name',
    value: 'code',
  };
  el.options = [
    { code: '1', name: 'option-1' },
    { code: '2', name: 'option-2' },
    { code: '3', name: 'option-3' },
    { code: '4', name: 'option-4' },
  ];
</script>
```

```jsx
<n-select
  default-value="3"
  placeholder="请选择"
  field-names={{
    label: 'name',
    value: 'code',
  }}
  options={[
    { code: '1', name: 'option-1' },
    { code: '2', name: 'option-2' },
    { code: '3', name: 'option-3' },
    { code: '4', name: 'option-4' },
  ]}
/>
```
