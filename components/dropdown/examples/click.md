---
title: 点击时开启
description: 将 `trigger` 属性设置为 `click`, 则可以将触发方式改为点击
order: 3
---

```html
<n-dropdown trigger="click">
  <n-button>点击我</n-button>
</n-dropdown>
<script>
  const el = container.querySelector('n-dropdown');

  el.options = [
    { value: '2', label: 'group one', options: ['A', 'B'] },
    {
      value: '1',
      label: 'group two',
      options: [
        { value: '3', label: 'option-3', danger: true },
        { value: '4', label: 'option-4', disabled: true },
      ],
    },
  ];
</script>
```

```jsx
<n-dropdown
  options={[
    { value: '2', label: 'option-2', options: ['A', 'B'] },
    {
      value: '1',
      label: 'option-1',
      options: [
        { value: '3', label: 'option-3', danger: true },
        { value: '4', label: 'option-4', disabled: true },
      ],
    },
  ]}
  trigger="click"
>
  <n-button>点击我</n-button>
</n-dropdown>
```
