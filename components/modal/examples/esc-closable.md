---
title: 通过 esc 按键关闭
description: 通过 `esc` 按键关闭, 默认开启
order: 4
---

```html
<n-button type="primary">通过 esc 按键关闭模态框</n-button>
<n-modal esc-closable="false"></n-modal>
<script>
  const modal = container.querySelector('n-modal');
  const btn = container.querySelector('n-button');

  btn.addEventListener('click', function (e) {
    modal.open = 'open';
  });
  const div = document.createElement('div');
  const p1 = document.createElement('p');

  p1.textContent = '按下 esc 键关闭模态框, 默认开启;';
  const p2 = document.createElement('p');

  p2.textContent = '这里关闭了 esc 键关闭功能;';
  div.append(p1);
  div.append(p2);
  modal.content = div;
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
        esc-closable={false}
        onOpenChange={handleOpenChange}
        content={
          <>
            <p>按下 esc 键关闭模态框, 默认开启;</p>
            <p>这里关闭了 esc 键关闭功能;</p>
          </>
        }
      />
      <n-button type="primary" onClick={handleOpen}>
        通过 esc 按键关闭模态框
      </n-button>
    </>
  );
};

render(<Demo />);
```
