---
title: 不同尺寸
description: 按钮有大、中、小三种尺寸。通过设置 `size` 为 `large`、`small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中。
order: 2
---

```html
<n-button type="primary" size="small">小按钮</n-button>
<n-button type="primary">默认按钮</n-button>
<n-button type="primary" size="large">大按钮</n-button>
<n-button type="success" size="small" circle="true">🤔</n-button>
<n-button type="success" circle="true">🤔</n-button>
<n-button type="success" size="large" circle="true">🤔</n-button>
```

```jsx
<n-button type="primary" size="small"> 小按钮 </n-button>
<n-button type="primary">默认按钮</n-button>
<n-button type="primary" size="large"> 大按钮 </n-button>
<n-button type="success" size="small" circle> 🤔 </n-button>
<n-button type="success" circle> 🤔 </n-button>
<n-button type="success" size="large" circle> 🤔 </n-button>
```
