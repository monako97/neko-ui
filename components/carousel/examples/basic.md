---
title: 最简单的用法
description: 最简单的用法
order: 1
---

```html
<n-carousel offset="2">
  <div>3 / 1</div>
  <div>3 / 2</div>
  <div>3 / 3</div>
</n-carousel>
```

```jsx
<n-carousel offset="2">
  {Array(100)
    .fill(0)
    .map((_, i) => {
      return <div>100 / {i + 1}</div>;
    })}
</n-carousel>
```
