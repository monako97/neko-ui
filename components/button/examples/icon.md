---
title: 图标
description: 在文字前面添加图标
order: 12
---

```html
<n-button icon="😂">按钮</n-button>
<n-button type="primary" size="small" icon="😂">按钮</n-button>
<n-button type="success" size="large" icon="😂">按钮</n-button>
<n-button type="warning">按钮</n-button>
<script>
  const el = container.querySelectorAll('n-button');

  el[3].icon = function () {
    const b = document.createElement('b');

    b.style.color = 'red';
    b.textContent = 'icon';
    return b;
  };
</script>
```

```jsx
<n-button icon="😂">按钮</n-button>
<n-button type="primary" size="small" icon="😂">按钮</n-button>
<n-button type="success" size="large" icon="😂">按钮</n-button>
<n-button type="warning" icon={() => <b style={{color:'red'}}>icon</b>}>按钮</n-button>
```
