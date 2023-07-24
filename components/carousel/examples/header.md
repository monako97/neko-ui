---
title: 添加头部
order: 4
---

```html
<n-carousel dots="true">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</n-carousel>
<script>
  const el = container.querySelector('n-carousel');
  el.header = function (current) {
    const header = document.createElement('div');
    header.style.padding = '16px';
    header.innerHTML = '3 / ' + (current + 1);
    return header;
  };
</script>
```

```jsx
const list = Array(10000)
  .fill(0)
  .map((_, i) => <div>10000 / {i + 1}</div>);

render(
  <n-carousel
    dots
    header={() => (num: number) => {
      return <div style="padding: 16px;">10000 / {num + 1}</div>;
    }}
  >
    {list}
  </n-carousel>
);
```
