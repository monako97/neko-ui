---
title: 高亮 diff
description: 将diff字符串高亮, 只需要将lang设置成 `diff-语言名称` 即可, 比如 css 你可以写成 `lang="diff-css"`
order: 5
---

```html
<h4>javascript</h4>
<n-code lang="diff-javascript">
+ let foo = bar.baz([1, 2, 3]);
-    foo = foo + 1;
  let foo = bar.baz([1, 2, 3]);
-    foo = foo + 1;
- console.log(12);
</n-code>
<h4>css</h4>
<n-code lang="diff-css">
+ body {
- div {
    color: red;
-   border: 5px solid #ddd;
-   outline: none;
  }
</n-code>
```

```jsx
<h4>javascript</h4>
<n-code
  code={`+ let foo = bar.baz([1, 2, 3]);
-    foo = foo + 1;
  let foo = bar.baz([1, 2, 3]);
-    foo = foo + 1;
- console.log(12);`}
  lang="diff-javascript"
/>
<h4>css</h4>
<n-code lang="diff-css" code={`+ body {
- div {
    color: red;
-   border: 5px solid #ddd;
-   outline: none;
  }`}
/>
```
