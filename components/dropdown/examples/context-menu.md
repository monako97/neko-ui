---
title: 右键触发
description: 将 `trigger` 属性设置为 `contextMenu`, 则可以将触发方式改为右键
order: 7
---

```html
<n-dropdown class="dropdown" style="width: 100%;" trigger="contextMenu">
  <div style="width: 100%;opacity: 0.4;">右键点我</div>
</n-dropdown>
<script>
  const el = container.querySelector('n-dropdown');

  el.css = `
    .dropdown {
      display: block;
      width: 100%;
      height: 150px;
      background-color: var(--disable-bg);
      border-radius: 8px;
      line-height: 150px;
      text-align: center;
      font-size: x-large;
    }
  `;
  el.items = [
    { value: '1', label: 'option-1' },
    { value: '2', label: 'option-2', disabled: true },
    { value: '3', label: 'option-3', type: 'error' },
  ];
</script>
```

```jsx
<n-dropdown
  class="dropdown"
  style={{ width: '100%' }}
  items={[
    { value: '1', label: 'option-1' },
    { value: '2', label: 'option-2', disabled: true },
    { value: '3', label: 'option-3', type: 'error' },
  ]}
  trigger="contextMenu"
  css={`
    .dropdown {
      display: block;
      width: 100%;
      height: 150px;
      background-color: var(--disable-bg);
      border-radius: 8px;
      line-height: 150px;
      text-align: center;
      font-size: x-large;
    }
  `}
>
  <div
    style={{
      width: '100%',
      opacity: 0.4,
    }}
  >
    右键点我
  </div>
</n-dropdown>
```
