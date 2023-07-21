---
title: 自定义字段名
description: 自定义节点 'label'、'value'、'options' 的字段
order: 4
---

```html
<n-menu></n-menu>
<script>
  const el = container.querySelector('n-menu');

  el.fieldNames = {
    label: 'name',
    options: 'children',
    children: 'options',
  };
  el.items = [
    {
      value: '1',
      name: '动物',
      children: ['牛', '马'],
    },
  ];
</script>
```

```jsx
<n-menu
  field-names={{
    label: 'name',
    options: 'children',
    children: 'options',
  }}
  items={[
    {
      value: '1',
      name: '动物',
      children: ['牛', '马'],
    },
  ]}
/>
```
