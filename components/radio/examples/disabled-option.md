---
title: 禁用选项
description: 禁用单个选项
order: 2
---

```html
<n-radio></n-radio>
<script>
  const el = container.querySelector('n-radio');

  el.options = ['React', 'Vue', { value: 'SolidJS', disabled: true }, 'Flutter'];
  el.value = 'Vue';
</script>
```

```jsx
<n-radio options={['React', 'Vue', { value: 'SolidJS', disabled: true }, 'Flutter']} />
```
