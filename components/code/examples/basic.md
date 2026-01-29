---
title: 最简单的用法
description: 这是最简单的用法示例
order: 0
---

```html
<n-code language="js">let foo = bar.baz([1, 2, 3]);
foo = foo + 1;
</n-code>
<strong>diff</strong>
<n-code language="git" code="+ <strong>diff</strong>">
</n-code>
<n-code toolbar="true" language="git javascript">+ let foo = bar.baz([1, 2, 3]);
-    foo = foo + 1;
  let foo = bar.baz([1, 2, 3]);
-    foo = foo + 1;
- console.log(12);
</n-code>
```

```jsx
<n-code
  code={`let foo = bar.baz([1, 2, 3]);
    foo = foo + 1;`}
  language="javascript"
/>
<strong>diff</strong>
<n-code
  code={`+ let foo = bar.baz([1, 2, 3]);
-    foo = foo + 1;
  let foo = bar.baz([1, 2, 3]);
-    foo = foo + 1;
- console.log(12);`}
  language="git javascript"
/>
```
