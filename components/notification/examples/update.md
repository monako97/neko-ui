---
title: 更新内容
description: 可以通过唯一的 key 来更新内容
order: 4
---

```html
<n-button>更新消息 (手动关闭)</n-button>
<script>
  const { notification } = NekoUI;
  const btn = container.querySelector('n-button');

  btn.addEventListener('click', function () {
    const id = notification.info('操作成功!!!', 5000);

    const timer = setTimeout(() => {
      const icon = document.createElement('i');

      icon.textContent = '🎉';
      notification.update(id, {
        type: 'success',
        children: '更新成功!!!',
        icon: icon,
      });
      clearTimeout(timer);
    }, 2000);
  });
</script>
```

```jsx
const { notification } = NekoUI;

const Demo = () => {
  const handleOpen = () => {
    const id = notification.info('操作成功!!!', 5000);

    const timer = setTimeout(() => {
      notification.update(id, {
        type: 'success',
        children: '更新成功!!!',
        icon: <i>🎉</i>,
      });
      clearTimeout(timer);
    }, 2000);
  };

  return <n-button onClick={handleOpen}>更新消息 (手动关闭)</n-button>;
};

render(<Demo />);
```
