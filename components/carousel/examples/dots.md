---
title: 指示器
description: 显示当前位置
order: 3
---

```html
<n-carousel dots="true">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</n-carousel>
```

```jsx
<n-carousel dots>
  {Array(100)
    .fill(0)
    .map((_, i) => {
      return <div>100 / {i + 1}</div>;
    })}
</n-carousel>
```
