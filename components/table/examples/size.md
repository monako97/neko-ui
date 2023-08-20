---
title: 不同的尺寸
description: Table 内置有大、中、小三种尺寸。通过 `size` 进行设置; 默认为 'normal'。
order: 7
---

```html
<n-table>
  <n-segmented slot="title" default-value="normal"></n-segmented>
</n-table>
<script>
  const el = container.querySelector('n-table');
  const segmented = el.querySelector('[slot="title"]');

  segmented.options = [
    { label: '小', value: 'small' },
    { label: '默认:中', value: 'normal' },
    { label: '大', value: 'large' },
  ];
  segmented.onchange = function (e) {
    el.size = e.detail;
  };
  el.columns = { name: '用户名', age: '年龄' };
  el.data = [
    { name: 'user 1', age: 18 },
    { name: 'user 2', age: 19 },
  ];
</script>
```

```jsx
<n-table
  columns={{ name: '用户名', age: '年龄' }}
  data={[
    { name: 'user 1', age: 18 },
    { name: 'user 2', age: 19 },
  ]}
>
  <n-segmented
    slot="title"
    default-value="normal"
    options={[
      { label: '小', value: 'small' },
      { label: '默认:中', value: 'normal' },
      { label: '大', value: 'large' },
    ]}
    onChange={function (e) {
      e.target.parentElement.size = e.detail;
    }}
  />
</n-table>
```
