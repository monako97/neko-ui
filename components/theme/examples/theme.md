---
title: 切换颜色模式
description: 通过传入一个基础色生成出主题色调
order: 2
col: 100%
---

```jsx
function Demo() {
  const handleTheme = () => {
    setTheme('scheme', (prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const label = createMemo(() => (theme.scheme === 'dark' ? '🌛 ' : '🌞 ') + theme.scheme);
  return (
    <n-button type="primary" flat={true} onClick={handleTheme}>
      <span>{label()}</span>
    </n-button>
  );
}
```
