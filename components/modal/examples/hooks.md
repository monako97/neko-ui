---
title: hooks
description: hooks的写法
order: 1
---

```html
<n-button>Modal</n-button>
<script>
  const btn = container.querySelector('n-button');

  btn.addEventListener('click', function () {
    NekoUI.Modal.open({
      title: '操作成功!!!',
      async onOk() {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('close');
            resolve(true);
          }, 2000);
        });
      },
      centered: true,
      okText: '删除',
      okProps: {
        danger: true
      }
    });
  });
</script>
```

```jsx
import { Modal } from 'neko-ui';

const Demo = () => {
  const handleOpen = () => {
    Modal.open({
      title: '操作成功!!!',
    });
  };

  return (
    <n-button type="primary" onClick={handleOpen}>
      显示通知
    </n-button>
  );
};

export default Demo;
```
