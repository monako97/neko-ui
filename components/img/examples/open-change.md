---
title: 大图开启关闭时的回调
description: 大图开启关闭时的回调
order: 3
---

```html
<n-img src="https://t7.baidu.com/it/u=2529476510,3041785782&fm=193&f=GIF"></n-img>
<script>
  const el = container.querySelector('n-img');

  el.addEventListener('openchange', function (e) {
    console.log('html', e.detail);
  });
</script>
```

```jsx
<n-img
  src="https://t7.baidu.com/it/u=2529476510,3041785782&fm=193&f=GIF"
  onopenchange={function (e) {
    console.log('jsx', e.detail);
  }}
/>
```
