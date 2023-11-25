---
title: 自定义关闭图标
description: 自定义关闭图标, 设置为 null 或 false 时隐藏关闭按钮
order: 2
---

```html
<n-button type="primary">关闭图标</n-button>
<n-modal title="自定义关闭图标" close-icon="关"></n-modal>
<script>
  const modal = container.querySelector('n-modal');
  const btn = container.querySelector('n-button');

  btn.addEventListener('click', function (e) {
    modal.open = 'open';
  });
  modal.content = 'content...';
  modal.addEventListener('openchange', function (e) {
    modal.open = e.detail;
  });
</script>
```

```jsx
const Demo = () => {
  const [open, setOpen] = createSignal('closed');
  const handleOpen = () => {
    setOpen('open');
  };
  const handleOpenChange = (e) => {
    setOpen(e?.detail);
  };

  return (
    <>
      <n-modal
        open={open}
        title="自定义关闭图标"
        close-icon="关"
        onOpenChange={handleOpenChange}
        content={
          <>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </>
        }
      />
      <n-button type="primary" onClick={handleOpen}>
        关闭图标
      </n-button>
    </>
  );
};

render(<Demo />);
```
