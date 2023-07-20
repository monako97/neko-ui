---
title: 基本使用
order: 1
---

```html
<n-popover arrow="true" placement="bottomLeft">
  <span>hover</span>
</n-popover>
<script>
  const el = container.querySelector('n-popover');

  el.content = function () {
    const c = document.createElement('div');

    c.innerHTML = `<n-typography type="success">success</n-typography>
      <n-typography type="error">danger</n-typography>`;
    return c;
  };
</script>
```

```jsx
<n-popover
  arrow
  placement="bottomLeft"
  content={() => (
    <div>
      <n-typography type="success">success</n-typography>
      <n-typography type="error">danger</n-typography>
    </div>
  )}
>
  <span>hover</span>
</n-popover>
```
