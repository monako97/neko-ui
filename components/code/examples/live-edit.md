---
title: 编辑
description: 支持编辑
---

```html
<n-code edit="true" language="javascript">
const foo = bar.baz([1, 2, 3]) + 1;
console.log(`foo: foo`);
</n-code>
```

```jsx
<n-code
  edit
  language="javascript"
  code={`const foo = bar.baz([1, 2, 3]) + 1;
console.log(\`foo: foo\`);`}
/>
```
