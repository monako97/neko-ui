---
title: 切换颜色模式
description: 通过传入一个基础色生成出主题色调
order: 2
col: 100%
---

```jsx
function Demo() {
  const { isDark, scheme, setScheme } = theme;
  function handleChange(e) {
    setScheme(e.detail ? 'dark' : 'light');
  }

  return (
    <n-switch checked={isDark()} onChange={handleChange} un-checked-text="🌞" checked-text="🌛" />
  );
}
```
