---
title: 最简单的用法
description: 最简单的用法
order: 1
---

```html
<n-button type="primary">打开模态框</n-button>
<n-modal title="最简单的用法"></n-modal>
<script>
  const modal = container.querySelector('n-modal');
  const btn = container.querySelector('n-button');

  btn.addEventListener('click', function (e) {
    modal.open = 'open';
  });
  modal.content = Array.from({ length: 100 }, (_, i) => {
    const p = document.createElement('p');

    p.textContent = `${i}Some contents...`;

    return p;
  });
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
        title="最简单的用法"
        onOpenChange={handleOpenChange}
        content={Array.from({ length: 100 }, (_, i) => (
          <p>{i}Some contents...</p>
        ))}
      />
      <n-button type="primary" onClick={handleOpen}>
        打开模态框
      </n-button>
    </>
  );
};

render(<Demo />);
```
