---
title: 头像组
description: 使用 AvatarGroup 将头像组合展现。
order: 3
---

```html
<n-avatar-group></n-avatar-group>
<n-avatar-group max-count="10"></n-avatar-group>
<script>
  const el = container.querySelectorAll('n-avatar-group');

  el[0].data = Array(4).fill({
    src: 'https://gw.alipayobjects.com/zos/alicdn/HJtErOC0O/avatar.png',
  });
  el[1].data = Array(20)
    .fill(0)
    .map((_, i) => {
      if (i % 2) {
        return {
          src: 'https://gw.alipayobjects.com/zos/alicdn/HJtErOC0O/avatar.png',
        };
      }
      return {
        username: ['avatar', 'gw', 'bjec', '#zos'][i % 3],
        color: ['#cabdeb', 'green', '#e9887c', '#e989ua'][i % 3],
      };
    });
</script>
```

```jsx
const data1 = Array(4).fill({
  src: 'https://gw.alipayobjects.com/zos/alicdn/HJtErOC0O/avatar.png',
});
const data2 = Array(20)
  .fill(0)
  .map((_, i) => {
    if (i % 2) {
      return {
        src: 'https://gw.alipayobjects.com/zos/alicdn/HJtErOC0O/avatar.png',
      };
    }
    return {
      username: ['avatar', 'gw', 'bjec', '#zos'][i % 3],
      color: ['#cabdeb', 'green', '#e9887c', '#e989ua'][i % 3],
    };
  });

render(
  <>
    <n-avatar-group data={data1} />
    <br />
    <n-avatar-group data={data2} max-count={10} />
  </>
);
```
