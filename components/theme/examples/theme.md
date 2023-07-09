---
title: 切换颜色模式
description: 通过传入一个基础色生成出主题色调
order: 2
---

```tsx
function Demo() {
  const handleTheme = () => {
    setTheme('scheme', theme.scheme === 'dark' ? 'light' : 'dark');
  };

  const label = createMemo(() => (theme.scheme === 'light' ? '🌞 ' : '🌛 ') + theme.scheme);
  return (
    <n-button type="primary" flat={true} onClick={handleTheme}>
      <span>{label()}</span>
    </n-button>
  );
}
```
