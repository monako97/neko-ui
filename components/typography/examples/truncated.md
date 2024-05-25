---
title: 超出隐藏
description: 添加 `truncated` 属性启用文本超出隐藏, 添加 `truncated.rows` 属性设置文本超出多少行后隐藏
order: 2
---

```html
<n-typography truncated="2">Don’t <n-typography type="success">compare</n-typography> your life with others. There’s no comparison between the <n-typography type="warning">sun</n-typography> and the <n-typography type="warning">moon</n-typography>. They shine when it’s their time.</n-typography>
```

```jsx
<n-typography truncated={2}>
  Don’t <n-typography type="success">compare</n-typography> your life with others. There’s no
  comparison between the <n-typography type="warning">sun</n-typography> and the
  <n-typography type="warning">moon</n-typography>. They shine when it’s their time.
</n-typography>
```
