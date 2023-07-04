---
title: 右键触发
description: 将 `trigger` 为 `contextMenu`，将可以通过右键触发提示框显示
order: 3
---

```html
<n-popover trigger="contextMenu">
  <div style="width: 100%;opacity: 0.4;">右键点我</div>
</n-popover>
<script>
  const el = container.querySelector('n-popover');
  const c = document.createElement('a');

  c.style.color = 'red';
  c.textContent = '右键触发';
  el.content = c;
  el.css = `.popover {
      display: block;
      width: 100%;
      height: 150px;
      background-color: var(--disable-bg);
      border-radius: 8px;
      line-height: 150px;
      text-align: center;
      font-size: x-large;
    }`;
</script>
```

```jsx
<n-popover
  content={<a style="color: red;">右键触发</a>}
  trigger="contextMenu"
  css={`
    .popover {
      display: block;
      width: 100%;
      height: 150px;
      background-color: var(--disable-bg);
      border-radius: 8px;
      line-height: 150px;
      text-align: center;
      font-size: x-large;
    }
  `}
>
  <div
    style={{
      width: '100%',
      opacity: 0.4,
    }}
  >
    右键点我
  </div>
</n-popover>
```
