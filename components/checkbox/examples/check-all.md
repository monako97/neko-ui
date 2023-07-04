---
title: 开启全选
description: 可以通过 `check-all` 设置开启全选
order: 5
---

```html
<n-checkbox check-all="true" value="2"></n-checkbox>
<script>
  const el = container.querySelector('n-checkbox');

  el.options = [
    { value: 1, label: '选项-1' },
    { value: 2, label: '选项-2' },
    { value: 3, label: '选项-3' },
    { value: 4, label: '选项-4' },
  ];
  el.onchange = function (e) {
    el.value = e.detail;
  };
</script>
```

```jsx
<n-checkbox
  check-all
  options={[
    { value: 1, label: '选项-1' },
    { value: 2, label: '选项-2' },
    { value: 3, label: '选项-3' },
    { value: 4, label: '选项-4' },
  ]}
  onChange={(e) => {
    e.target.value = e.detail;
  }}
/>
```
