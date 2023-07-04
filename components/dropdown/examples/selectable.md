---
title: 菜单可选择
description: 将 `selectable` 属性设置为 true, 则可以选中点击项
order: 8
---

```html
<n-dropdown selectable="true">
  <div>可选择</div>
</n-dropdown>
<script>
  const el = container.querySelector('n-dropdown');

  el.options = [
    { value: '1', label: 'option-1' },
    { value: '2', label: 'option-2', disabled: true },
    { value: '3', label: 'option-3', danger: true },
  ];
  el.onchange = function(e) {
    console.log(e.detail);
  }
</script>
```

```jsx
<n-dropdown
  selectable
  options={[
    { value: '1', label: 'option-1' },
    { value: '2', label: 'option-2', disabled: true },
    { value: '3', label: 'option-3', danger: true },
  ]}
  onChange={(e) => {
    console.log(e.detail);
  }}
>
  <div>可选择</div>
</n-dropdown>
```
