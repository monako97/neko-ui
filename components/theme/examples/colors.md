---
title: 调色板、生成、设置主题色
description: 通过传入一个基础色生成出主题色调
order: 1
col: 1
---

```jsx
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

function Item({ name, dark }) {
  const colors = createMemo(() => {
    return toneColor(theme[dark ? 'dark' : 'light'][name], dark);
  });
  const [val, setVal] = createSignal(colors()[40]);

  return (
    <div
      style={{
        display: 'flex',
        'align-items': 'center',
        'flex-wrap': 'wrap',
        gap: '8px',
        width: '100%',
      }}
    >
      <n-color-picker
        style={{ display: 'block', height: '25px' }}
        value={colors()[40]}
        onChange={(e) => {
          setTheme(dark ? 'dark' : 'light', (prev) => {
            return { ...prev, [name]: e.detail };
          });
        }}
      />
      {Object.keys(colors()).map((c, i) => {
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
              'padding-block': '4px',
              'text-align': 'center',
              'border-radius': 'var(--border-radius)',
              'font-size': '8px',
              'font-weight': 100,
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
            gap: '8px',
            padding: '8px',
            'margin-bottom': '16px',
            'border-radius': '8px',
            width: '100%',
            border: 'var(--border-base)',
            'background-color': c,
            'overflow-x': 'auto',
          }}
        >
          <Item name="primary" dark={dark} />
          <Item name="warning" dark={dark} />
          <Item name="error" dark={dark} />
          <Item name="success" dark={dark} />
        </div>
      );
    })}
  </>
);
```
