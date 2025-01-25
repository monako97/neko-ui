---
title: 手动关闭
description: 带关闭按钮
order: 2
---

```html
<n-button>消息通知(手动关闭)</n-button>
<script>
  const btn = container.querySelector('n-button');

  btn.addEventListener('click', function () {
    NekoUI.notification.info('操作成功!!!', 0, true);
  });
</script>
```

```jsx
import { notification } from 'neko-ui';

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

export default Demo;
```
