---
title: 基本使用
description: 内置 5 种类型：`default`、`primary`、`success`、`warning`、`error`。
order: 1
---

```html
<div style="display:flex;gap:4px;">
  <n-button>按钮</n-button>
  <n-button type="primary">按钮</n-button>
  <n-button type="success">按钮</n-button>
  <n-button type="warning">按钮</n-button>
  <n-button type="error">按钮</n-button>
  <n-button loading="true">按钮</n-button>
</div>
```

```jsx
<div style={{ display: 'flex', gap: '4px' }}>
  <n-button>按钮</n-button>
  <n-button type="primary">按钮</n-button>
  <n-button type="success">按钮</n-button>
  <n-button type="warning">按钮</n-button>
  <n-button type="error">按钮</n-button>
  <n-button loading="true">按钮</n-button>
</div>
```
