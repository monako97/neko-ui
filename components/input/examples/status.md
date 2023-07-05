---
title: 自定义状态
description: 使用 `status` 为输入框添加状态，可选 `error`、`warning`、`success`
order: 4
---

```html
<div style="width:180px;display: flex; flex-direction: column; gap: 12px;">
  <n-input type="email" label="Email" disabled="true" status="success"></n-input>
  <n-input type="password" label="Password" status="error"></n-input>
  <n-input type="tel" label="Tel" status="warning"></n-input>
  <n-input type="user" label="User" status="success"></n-input>
</div>
```

```jsx
<div style={{ width: '180px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
  <n-input type="email" label="Email" disabled status="success" />
  <n-input type="password" label="Password" status="error" />
  <n-input type="tel" label="Tel" status="warning" />
  <n-input type="user" label="User" status="success" />
</div>
```
