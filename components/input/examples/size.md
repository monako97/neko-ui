---
title: 不同尺寸
description: 输入框内置有大、中、小三种尺寸。通过设置 `size` 为 `large`、`small` 分别把尺寸设为大、小尺寸。若不设置 `size`，则尺寸为中 'normal'。
order: 2
---

```html
<div style="width:180px;display: flex; flex-direction: column; gap: 12px;">
  <n-input label="小尺寸" size="small"></n-input>
  <n-input label="默认大小" placeholder="请输入文字"></n-input>
  <n-input label="大尺寸" size="large" placeholder="请输入文字"></n-input>
</div>
```

```jsx
<div style={{ width: '180px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
  <n-input label="小尺寸" size="small" />
  <n-input label="默认大小" placeholder="请输入文字" />
  <n-input label="大尺寸" size="large" placeholder="请输入文字" />
</div>
```
