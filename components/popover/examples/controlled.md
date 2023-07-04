---
title: 受控
description: 通过指定 `open` 属性来控制弹出
order: 4
---

```html
<n-popover
  arrow="true"
  trigger="click"
  content="这是一个受控的popover, 通过修改 `open` 属性来控制弹出"
  >受控</n-popover
>
<n-switch checked-text="打开" un-checked-text="关闭"></n-switch>
<script>
  const cl = container.querySelector('n-switch');
  const el = container.querySelector('n-popover');

  cl.onchange = function (e) {
    el.open = e.detail;
  };
</script>
```

```jsx
const [open, setOpen] = createSignal(false);

render(
  <>
    <n-switch
      checked-text="打开"
      un-checked-text="关闭"
      onChange={(e) => {
        setOpen(e.detail);
      }}
    />
    <n-popover
      arrow
      open={open}
      content="这是一个受控的popover, 通过修改 `open` 属性来控制弹出"
      trigger="click"
    >
      受控
    </n-popover>
  </>
);
```
