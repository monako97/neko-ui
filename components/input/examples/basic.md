---
title: 基本使用
description: 基本使用
order: 1
---

```html
<div style="width:180px;display: flex; flex-direction: column; gap: 12px;">
  <n-input type="text" label="Text" required="true"></n-input>
  <n-input type="number" label="Number"></n-input>
  <n-input type="url" label="Url"></n-input>
  <n-input type="email" label="Email"></n-input>
  <n-input type="password" label="Password"></n-input>
  <n-input type="tel" label="Tel"></n-input>
  <n-input type="user" label="User"></n-input>
  <n-input type="time" label="Disabled time" disabled="true"></n-input>
</div>
```

```jsx
<div style={{ width: '180px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
  <n-input type="text" label="Text" required />
  <n-input type="number" label="Number" />
  <n-input type="url" label="Url" />
  <n-input type="email" label="Email" />
  <n-input type="password" label="Password" />
  <n-input type="tel" label="Tel" />
  <n-input type="user" label="User" />
  <n-input type="time" label="Disabled time" disabled />
</div>
```
