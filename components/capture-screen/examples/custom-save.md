---
title: 自定义保存录制视频方法
description: 如果需要自定义保存视频或者对录制内容进行修改，可以通过 `onSaveRecorder` 回调函数进行操作
order: 4
---

```html
<n-capture-screen recorder="true" filename="自定义保存录制视频文件名"></n-capture-screen>
<script>
  const el = container.querySelector('n-capture-screen');

  el.addEventListener('saverecorder', function (e) {
    const { blob, fileName } = e.detail;
    console.log('停止录制', fileName, 'size:', (blob.size / 1048576).toFixed(2) + 'mb');
    // save event
  });
</script>
```

```jsx
<n-capture-screen
  recorder
  filename="自定义保存录制视频文件名"
  onSaveRecorder={(e) => {
    const { blob, fileName } = e.detail;
    console.log('停止录制', fileName, 'size:', (blob.size / 1048576).toFixed(2) + 'mb');
    // save event
  }}
/>
```
