---
title: 遮罩模糊
description: 给遮罩添加高斯模糊
order: 5
---

```html
<n-button type="primary">遮罩模糊</n-button>
<n-modal title="给遮罩添加高斯模糊" mask-blur="true"></n-modal>
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
        title="给遮罩添加高斯模糊"
        mask-blur={true}
        onOpenChange={handleOpenChange}
        content={
          <>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </>
        }
      />
      <n-button type="primary" onClick={handleOpen}>
        遮罩模糊
      </n-button>
    </>
  );
};

render(<Demo />);
```
