---
title: 隐藏域(年)
order: 1
---

```html
<n-cron default-value="0-1 * 0-1 * * ?"></n-cron>
<script>
  const el = container.querySelector('n-cron');

  el.exclude = ['year'];
  el.onchange = function (e) {
    console.log(e.detail);
  };
</script>
```

```jsx
<n-cron default-value="0-1 * 0-1 * * ?" exclude={['year']} />
```
