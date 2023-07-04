---
title: 垂直排列
description: 通过设置 `vertical` 属性来使用垂直排列
order: 4
---

```html
<n-checkbox layout="vertical"></n-checkbox>
<script>
  const el = container.querySelector('n-checkbox');

  el.options = [
    { value: 'a', label: '选项-1' },
    { value: 'b', label: '选项-2' },
    { value: 'c', label: '选项-3' },
  ];
  el.onchange = function (e) {
    el.value = e.detail;
  };
</script>
```

```jsx
<n-checkbox
  layout="vertical"
  name="vertical-checkbox"
  options={[
    { value: 'a', label: '选项-1' },
    { value: 'b', label: '选项-2' },
    { value: 'c', label: '选项-3' },
  ]}
  onChange={(e) => {
    e.target.value = e.detail;
  }}
/>
```
