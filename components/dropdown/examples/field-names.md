---
title: 自定义字段名
description: 自定义节点 `label`、`value`、`options` 的字段
order: 12
---

```html
<n-dropdown>
  <n-button>自定义字段</n-button>
</n-dropdown>
<script>
  const el = container.querySelector('n-dropdown');

  el.fieldNames = {
    label: 'name',
    options: 'children',
  };
  el.options = [
    {
      value: '1',
      name: '动物',
      children: ['牛', '马'],
    },
  ];
</script>
```

```jsx
<n-dropdown
  field-names={{
    label: 'name',
    options: 'children',
  }}
  options={[
    {
      value: '1',
      name: '动物',
      children: ['牛', '马'],
    },
  ]}
>
  <n-button>自定义字段</n-button>
</n-dropdown>
```
