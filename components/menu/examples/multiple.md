---
title: 多选模式
description: 将 `multiple` 属性设置为 true, 进行多选操作, 当设置 `value` 时值受控
order: 2
---

```html
<n-menu selectable="true" multiple="true">
  <div>可多选</div>
</n-menu>
<script>
  const el = container.querySelector('n-menu');

  el.items = [
    { value: 'a', label: '张三' },
    { value: 'b', label: '李四' },
    { value: 'c', label: '王五', type: 'error' },
    { value: 'd', label: '赵六' },
  ];
  el.value = ['a', 'c'];
  el.onchange = function (e) {
    e.target.value = e.detail.key;
  };
</script>
```

```jsx
<n-menu
  multiple
  selectable
  value={['2', '4']}
  items={[
    { value: '1', label: '张三' },
    { value: '2', label: '李四' },
    { value: '3', label: '王五' },
    { value: '4', label: '赵六' },
  ]}
  onChange={(e) => {
    e.target.value = e.detail.key;
  }}
/>
```
