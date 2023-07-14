---
title: 可取消选中
description: 将 `toggle` 属性设置为 true, 则可以在选中时取消
order: 10
---

```html
<n-dropdown selectable="true" toggle="true">
  <div>可取消选中</div>
</n-dropdown>
<script>
  const el = container.querySelector('n-dropdown');

  el.items = [
    { value: '1', label: '张三' },
    { value: '2', label: '李四' },
    { value: '3', label: '王五' },
    { value: '4', label: '赵六' },
  ];
</script>
```

```jsx
<n-dropdown
  toggle
  selectable
  items={[
    { value: '1', label: '张三' },
    { value: '2', label: '李四' },
    { value: '3', label: '王五' },
    { value: '4', label: '赵六' },
  ]}
>
  <div>可取消选中</div>
</n-dropdown>
```
