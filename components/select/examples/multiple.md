---
title: 多选模式
description: 设置 `multiple` 属性支持多选
order: 4
---

```html
<n-select multiple="true" placeholder="请选择"></n-select>
<script>
  const el = container.querySelector('n-select');

  el.defaultValue = ['3', '6', '2'];
  el.options = [
    {
      label: '普通',
      options: [
        { value: '1', label: '张三' },
        { value: '2', label: '李四' },
        { value: '3', label: '王五' },
      ],
    },
    {
      label: '华山派',
      options: [
        { value: '4', label: '赵六' },
        { value: '7', label: '王五3' },
        { value: '8', label: '赵六4', type: 'warning' },
        { value: '5', label: '张三1', disabled: true },
        { value: '6', label: '李四2', type: 'error' },
      ],
    },
  ];
</script>
```

```jsx
<n-select
  multiple
  default-value={['2', '3']}
  options={[
    {
      label: '普通',
      options: [
        { value: '1', label: '张三' },
        { value: '2', label: '李四' },
        { value: '3', label: '王五' },
      ],
    },
    {
      label: '华山派',
      options: [
        { value: '4', label: '赵六' },
        { value: '7', label: '王五3' },
        { value: '8', label: '赵六4', type: 'warning' },
        { value: '5', label: '张三1', disabled: true },
        { value: '6', label: '李四2', type: 'error' },
      ],
    },
  ]}
/>
```
