---
title: 基本使用
order: 1
---

```html
<style>
  #box-glass {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50vh;
    background-image: url(https://img.picui.cn/free/2025/06/11/6849a037bb61d.gif);
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
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'text-align': 'center',
    height: '50vh',
    'background-image': 'url(https://img.picui.cn/free/2025/06/11/6849a037bb61d.gif)',
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
