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
  const header = document.createElement('div');
  header.style.padding = '16px';
  header.innerHTML = '3 / 1';
  el.header = header;
  el.onchange = function (e) {
    header.innerHTML = `3 / ${e.detail + 1}`;
    el.header = header;
  };
</script>
```

```jsx
function Demo() {
  const list = Array(10000)
    .fill(0)
    .map((_, i) => <div>10000 / {i + 1}</div>);

  return (
    <n-carousel
      dots
      header={<div style="padding: 16px;">10000 / 1</div>}
      onchange={(e) => {
        e.target.header = <div style="padding: 16px;">10000 / {e.detail + 1}</div>;
      }}
    >
      {list}
    </n-carousel>
  );
}

render(<Demo />);
```
