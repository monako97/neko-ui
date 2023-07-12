---
title: 附加内容
description: 可以在页签两边添加附加操作
order: 4
---

```html
<n-tabs></n-tabs>
<script>
  const el = container.querySelector('n-tabs');

  el.extra = {
    left: () => {
      const btn = document.createElement('n-button');

      btn.textContent = 'Left';
      btn.size = 'small';
      return btn;
    },
    right: () => {
      const btn = document.createElement('n-button');

      btn.textContent = 'Right';
      btn.size = 'small';
      return btn;
    },
  };
  el.items = new Array(3).fill(0).map((_, i) => {
    return {
      value: i + 1,
      label: `Tab ${i + 1}`,
      content: () => {
        const md = document.createElement('n-md');

        md.textContent = `!> Content of Tab Pane ${i + 1}`;
        return md;
      },
    };
  });
</script>
```

```jsx
function Demo() {
  const Content = (props) => {
    return <n-md>!> Content of Tab Pane {props.idx}</n-md>;
  };

  return (
    <n-tabs
      extra={{
        left: () => <n-button size="small">Left</n-button>,
        right: () => <n-button size="small">Right</n-button>,
      }}
      items={new Array(3).fill(0).map((_, i) => {
        return {
          value: i + 1,
          label: `Tab ${i + 1}`,
          content: () => <Content idx={i + 1} />,
        };
      })}
    />
  );
}
```
