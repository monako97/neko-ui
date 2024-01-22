---
title: 不同的通知类型
description: 不同的通知类型
order: 2
---

```html
<n-button>消息</n-button>
<n-button type="primary">主要</n-button>
<n-button type="error">错误</n-button>
<n-button type="warning">警告</n-button>
<n-button type="success">成功</n-button>
<script>
  const { notification } = NekoUI;
  const btns = container.querySelectorAll('n-button');

  btns.forEach((btn) => {
    btn.addEventListener('click', function () {
      switch (btn.type) {
        case 'primary':
          notification.primary(`${btn.type} message`, 5000);
          break;
        case 'warning':
          notification.warning(`${btn.type} message`, 2000);
          break;
        case 'error':
          notification.error(`${btn.type} message`, 0, true);
          break;
        case 'success':
          notification.success(`${btn.type} message`, 4000);
          break;
        default:
          notification.info('info message', 1000);
          break;
      }
    });
  });
</script>
```

```jsx
const Demo = () => {
  const { notification } = NekoUI;
  const handleOpen = (type: string) => {
    switch (type) {
        case 'primary':
          notification.primary(`${type} message`, 5000);
          break;
        case 'warning':
          notification.warning(`${type} message`, 2000);
          break;
        case 'error':
          notification.error(`${type} message`, 0, true);
          break;
        case 'success':
          notification.success(`${type} message`, 4000);
          break;
        default:
          notification.info('info message', 1000);
          break;
      }
  };

  return (
    <>
      <n-button onClick={handleOpen.bind(null, 'info')}>消息</n-button>
      <n-button type="primary" onClick={handleOpen.bind(null, 'primary')}>
        主要
      </n-button>
      <n-button type="error" onClick={handleOpen.bind(null, 'error')}>
        错误
      </n-button>
      <n-button type="warning" onClick={handleOpen.bind(null, 'warning')}>
        警告
      </n-button>
      <n-button type="success" onClick={handleOpen.bind(null, 'success')}>
        成功
      </n-button>
    </>
  );
};

render(<Demo />);
```
