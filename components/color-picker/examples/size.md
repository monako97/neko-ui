---
title: 不同尺寸
description: 颜色选择器有大、中、小三种尺寸。通过设置 `size` 为 `large`、`small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中 `normal`。
order: 2
---

```html
<div style="display: flex;align-items:flex-end; gap: 16px;">
  <n-color-picker value="#fedaaa" size="small"></n-color-picker>
  <n-color-picker value="red" size="normal"></n-color-picker>
  <n-color-picker value="green" size="large"></n-color-picker>
</div>
```

```jsx
<div style={{ display: 'flex', 'align-items': 'flex-end', gap: 16 }}>
  <n-color-picker value="#fedaaa" size="small" />
  <n-color-picker value="red" size="normal" />
  <n-color-picker value="green" size="large" />
</div>
```
