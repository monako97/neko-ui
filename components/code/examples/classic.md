---
title: 经典模式
description: 将 `classic` 属性设置成 fase 来关闭经典模式
order: 0
---

```html
<n-code toolbar="true" language="git javascript" classic="false">+ let foo = bar.baz([1, 2, 3]);
-    foo = foo + 1;
  let foo = bar.baz([1, 2, 3]);
-    foo = foo + 1;
- console.log(12);
</n-code>
```

```jsx
<n-code
  code={`+ let foo = bar.baz([1, 2, 3]);
-    foo = foo + 1;
  let foo = bar.baz([1, 2, 3]);
-    foo = foo + 1;
- console.log(12);`}
toolbar={true}
  language="git javascript" classic={false}
/>
```
