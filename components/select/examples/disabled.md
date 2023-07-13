---
title: 不可用状态
description: 设置 `disabled` 属性禁用操作
order: 3
---

```html
<n-select default-value="B" disabled="true"></n-select>
<hr />
<n-select multiple="true" disabled="true"></n-select>
<script>
  const el = container.querySelectorAll('n-select');

  el[0].options = ['A', 'B', 'D'];
  el[1].options = ['A', 'B', 'D'];
  el[1].value = ['A', 'D'];
</script>
```

```jsx
<n-select default-value="B" disabled options={['A', 'B', 'D']} />
<hr />
<n-select value={['A', 'D']} multiple disabled options={['A', 'B', 'D']} />
```
