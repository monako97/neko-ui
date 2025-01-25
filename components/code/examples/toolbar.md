---
title: 顶部工具栏
description: 显示顶部工具栏
order: 2
---

```html
<n-code toolbar="true" language="javascript" title="js">const foo = bar.baz([1, 2, 3]) + 1;
console.log(`foo: ${foo}`);
</n-code>
<n-code style="margin-top: 16px;" toolbar="true" language="regex">/^diff-([\w-]+)/i</n-code>
```

```jsx
<n-code toolbar language="javascript">
  {`const foo = bar.baz([1, 2, 3]) + 1;
console.log(\`foo: \${foo}\`);`}
</n-code>
<n-code style={{ 'margin-top': '16px' }} toolbar="true" language="regex" code={'/^diff-([\w-]+)/i'} />
```
