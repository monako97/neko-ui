---
title: 图标
description: 为每个选项搭配上图标
order: 5
---

```html
<n-segmented value="3"></n-segmented>
<script>
  const el = container.querySelector('n-segmented');
  const icon = document.createElement('span');

  icon.textContent = 'Ⓒ';
  icon.style.color = 'red';
  el.options = ['HTML', { value: 3, label: 'CSS', icon: icon }, 'JavaScript'];
</script>
```

```jsx
<n-segmented
  value={3}
  options={[
    'HTML',
    { value: 3, label: 'CSS', icon: <span style={{ color: 'red' }}>Ⓒ</span> },
    'JavaScript',
  ]}
/>
```
