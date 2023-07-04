---
title: 渲染树状字符串
description: 渲染 tree 命令输出的树状字符串
order: 9
---

```html
<n-tree></n-tree>
<script>
  const el = container.querySelector('n-tree');

  el.data = `.
|-- components
|   |-- index.ts
|   \`-- wave-circle
| |-- examples
| | |-- api.md
| | \`-- demo.mdx
| |-- index.tsx
| \`-- README.mdx
|-- config
| |-- index.ts
| \`-- prod.ts
|-- docs
| |-- index.js
| \`-- index.html
|-- es
| |-- index.js
| \`-- wave-circle
| \`-- index.js
|-- .eslintrc.yaml
|-- .gitattributes
|-- .prettierrc.yaml
|-- .stylelintrc.yaml
|-- package.json
|-- README.md
\`-- tsconfig.json`;
</script>
```

```jsx
<n-tree
  data={`.
|-- components
|   |-- index.ts
|   \`-- wave-circle
| |-- examples
| | |-- api.md
| | \`-- demo.mdx
| |-- index.tsx
| \`-- README.mdx
|-- config
| |-- index.ts
| \`-- prod.ts
|-- docs
| |-- index.js
| \`-- index.html
|-- es
| |-- index.js
| \`-- wave-circle
| \`-- index.js
|-- .eslintrc.yaml
|-- .gitattributes
|-- .prettierrc.yaml
|-- .stylelintrc.yaml
|-- package.json
|-- README.md
\`-- tsconfig.json`}
/>
```
