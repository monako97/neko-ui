---
title: 基本使用
order: 1
---

```html
<style>
  #box-glass {
    text-align: center;
    height: 50vh;
    background-image: url(https://nodei.co/npm/neko-ui.png);
  }
</style>
<div id="box-glass">
  <n-glass-panel
    style=" width: 300px;height: 300px;border: 1px solid rgba(255, 255, 255, 0.8); border-radius: 8px;box-shadow: 0 1px 4px rgb(0 21 41 / 8%);"
  >
    <div class="glass">hover</div>
  </n-glass-panel>
</div>
```

```jsx
<div
  style={{
    'text-align': 'center',
    height: '50vh',
    'background-image': 'url(https://nodei.co/npm/neko-ui.png)',
  }}
>
  <n-glass-panel
    style={{
      width: '300px',
      height: '300px',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      'border-radius': '8px',
      'box-shadow': '0 1px 4px rgb(0 21 41 / 8%)',
    }}
  >
    <div class="glass">hover</div>
  </n-glass-panel>
</div>
```
