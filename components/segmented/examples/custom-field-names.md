---
title: 自定义字段名
description: 自定义节点 `label`、`value`、`options` 的字段
order: 6
---

```html
<n-segmented default-value="3"></n-segmented>
<script>
  const el = container.querySelector('n-segmented');

  el.fieldNames = {
    label: 'name',
    value: 'code',
  };
  el.options = [
    { code: 1, name: '选项1' },
    { code: 2, name: '选项2' },
    { code: 3, name: '选项3' },
  ];
  el.onchange = function (e) {
    console.log(e.detail);
  };
</script>
```

```jsx
<n-segmented
  default-value={3}
  field-names={{
    label: 'name',
    value: 'code',
  }}
  options={[
    { code: 1, name: '选项1' },
    { code: 2, name: '选项2' },
    { code: 3, name: '选项3' },
  ]}
  onchange={(e) => {
    console.log(e.detail);
  }}
/>
```
