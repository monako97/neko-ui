---
title: 新增和关闭标签页
description: 添加 `add` 属性并设置为 `true` 显示新增按钮, 将选项的 `closable` 属性为 `true` 以支持关闭该选项
order: 7
---

```html
<div style="width:500px;">
  <n-tabs value="2" type="card" add="true"></n-tabs>
</div>
<script>
  const el = container.querySelector('n-tabs');

  let count = 2;

  el.items = new Array(3).fill(0).map((_, i) => {
    return {
      value: i,
      label: `Tab ${i}`,
      content: `Content of Tab Pane ${i}`,
      closable: true,
    };
  });
  el.addEventListener('change', function (e) {
    el.value = e.detail[0];
  });
  el.addEventListener('edit', function (e) {
    const [type, item, ev] = e.detail;

    if (type === 'add') {
      count++;
      const val = count + new Date().getTime();
      el.items = el.items.concat({
        label: `Tab ${count}`,
        value: val,
        content: `Content of Tab Pane ${val}`,
        closable: count % 5 !== 0,
      });
      el.value = val;
    } else if (type === 'remove') {
      let lastIndex = -1;
      el.items = el.items.filter((o, i) => {
        const flag = item.value !== o.value;

        if (!flag) {
          lastIndex = i ? i - 1 : 0;
        }
        return flag;
      });
      if (lastIndex >= 0 && el.items[lastIndex]) {
        el.value = el.items[lastIndex].value;
      }
    }
  });
</script>
```

```jsx
const Demo = () => {
  let el;
  let count = 2;
  const items = new Array(3).fill(0).map((_, i) => {
    return {
      value: i,
      label: `Tab ${i}`,
      content: `Content of Tab Pane ${i}`,
      closable: true,
    };
  });
  const handleEdit = (e) => {
    const [type, item, ev] = e.detail;

    if (type === 'add') {
      count++;
      const val = count + new Date().getTime();
      el.items = el.items.concat({
        label: `Tab ${count}`,
        value: val,
        content: `Content of Tab Pane ${val}`,
        closable: count % 5 !== 0,
      });
      el.value = val;
    } else if (type === 'remove') {
      let lastIndex = -1;
      el.items = el.items.filter((o, i) => {
        const flag = item.value !== o.value;

        if (!flag) {
          lastIndex = i ? i - 1 : 0;
        }
        return flag;
      });
      if (lastIndex >= 0 && el.items[lastIndex]) {
        el.value = el.items[lastIndex].value;
      }
    }
  };
  return (
    <div style={{ width: '500px' }}>
      <n-tabs
        ref={(e) => (el = e)}
        type="card"
        add={true}
        items={items}
        onChange={(e) => {
          e.target.value = e.detail[0];
        }}
        onEdit={handleEdit}
      />
    </div>
  );
};

render(<Demo />);
```
