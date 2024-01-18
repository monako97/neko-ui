---
title: 最简单的用法
description: 最简单的用法
order: 1
---

```html
<n-button>消息通知</n-button>
<script>
  const { notification } = NekoUI;
  const btn = container.querySelector('n-button');

  btn.addEventListener('click', function () {
    notification.info('操作成功!!!');
  });
</script>
```

```jsx
const { notification } = NekoUI;

const Demo = () => {
  const handleOpen = () => {
    notification.info('操作成功!!!');
  };

  return (
    <n-button type="primary" onClick={handleOpen}>
      显示通知
    </n-button>
  );
};

render(<Demo />);
```
