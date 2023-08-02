---
title: 调色板、生成、设置主题色
description: 通过传入一个基础色生成出主题色调
order: 1
col: 100%
---

```jsx
const { dark, setDark, light, setLight } = NekoUI.theme;

function getTextColor(colors) {
  return {
    0: colors['100'],
    1: colors['90'],
    2: colors['90'],
    3: colors['95'],
    4: colors['95'],
    5: colors['99'],
    6: colors['99'],
    7: colors['30'],
    8: colors['30'],
    9: colors['20'],
    10: colors['20'],
    11: colors['10'],
    12: colors['5'],
    13: colors['5'],
    14: colors['0'],
  };
}

function Item({ name, isDark }) {
  const color = createMemo(() => (isDark ? dark() : light())[name]);
  const colors = createMemo(() => NekoUI.toneColor(color(), isDark));

  return (
    <div
      style={{
        display: 'flex',
        'align-items': 'center',
        'flex-wrap': 'wrap',
        width: '100%',
        'font-size': '8px',
        'font-weight': 100,
        'text-align': 'center',
      }}
    >
      <strong
        style={{
          width: '30px',
          'text-align': 'right',
          'margin-right': '8px',
          color: `var(--${name}-color)`,
        }}
      >
        {name}:
      </strong>
      <n-color-picker
        style={{ 'margin-right': '8px' }}
        value={color()}
        onChange={(e) => {
          if (isDark) {
            setDark((prev) => {
              return { ...prev, [name]: e.detail };
            });
          } else {
            setLight((prev) => {
              return { ...prev, [name]: e.detail };
            });
          }
          e.target.value = e.detail;
        }}
      />
      {Object.keys(colors()).slice(1,-1).map((c, i) => {
        let item;
        createEffect(() => {
          item.style.backgroundColor = colors()[c];
          item.style.color = getTextColor(colors())[i];
        });
        return (
          <div
            ref={(e) => (item = e)}
            class="item"
            style={{
              flex: 1,
              padding: '4px',
            }}
          >
            <div>{c}</div>
            <div>{colors()[c]}</div>
          </div>
        );
      })}
    </div>
  );
}

render(
  <>
    {['#fff', '#000'].map((c) => {
      const dark = c === '#000';

      return (
        <div
          style={{
            display: 'flex',
            'flex-direction': 'column',
            padding: '8px',
            'margin-bottom': '16px',
            width: '100%',
            'background-color': c,
            'overflow-x': 'auto',
          }}
        >
          <Item name="primary" isDark={dark} />
          <Item name="warning" isDark={dark} />
          <Item name="error" isDark={dark} />
          <Item name="success" isDark={dark} />
        </div>
      );
    })}
  </>
);
```
