---
title: 不可用
description: 禁用全部选项选项
order: 4
---

```html
<n-segmented value="Vue" disabled="true"></n-segmented>
<script>
  const el = container.querySelector('n-segmented');

  el.options = ['React', 'Vue', 'SolidJS', 'Flutter'];
</script>
```

```jsx
<n-segmented value="Vue" disabled options={['React', 'Vue', 'SolidJS', 'Flutter']} />
```
