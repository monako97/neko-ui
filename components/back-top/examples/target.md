---
title: 指定滚动容器
description: 通过 `target` 属性设置滚动容器, 通过 `visibility-height` 属性设置容器滚动到 200 时出现返回顶部
order: 3
---

```html
<div
  id="custom-back-top-target"
  style="height: 200px; width: 100%; overflow: auto; position: relative;"
>
  <div>
    <p style="height: 100px;">1</p>
    <p style="height: 100px;">2</p>
    <p style="height: 100px;">3</p>
    <p style="height: 100px;">4</p>
  </div>
  <n-back-top visibility-height="200"></n-back-top>
</div>
<script>
  const el = container.querySelector('n-back-top');

  el.target = container.getElementById('custom-back-top-target');
</script>
```

```jsx
let el: HTMLDivElement;

render(
  <div
    ref={(e) => {
      el = e;
    }}
    style={{ height: '200px', width: '100%', overflow: 'auto', position: 'relative' }}
  >
    <div>
      <p style="height: 100px;">1</p>
      <p style="height: 100px;">2</p>
      <p style="height: 100px;">3</p>
      <p style="height: 100px;">4</p>
    </div>
    <n-back-top visibility-height={200} target={() => el} />
  </div>
);
```
