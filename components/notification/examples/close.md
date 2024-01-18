---
title: 手动关闭
description: 带关闭按钮
order: 2
---

```html
<n-button>消息通知(手动关闭)</n-button>
<script>
  const { notification } = NekoUI;
  const btn = container.querySelector('n-button');

  btn.addEventListener('click', function () {
    notification.info('操作成功!!!', 0, true);
  });
</script>
```

```jsx
const { notification } = NekoUI;

const Demo = () => {
  const handleOpen = () => {
    notification.info('操作成功!!!', 0, true);
  };

  return (
    <n-button type="primary" onClick={handleOpen}>
      显示通知
    </n-button>
  );
};

render(<Demo />);
```
