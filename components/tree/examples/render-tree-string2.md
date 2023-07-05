---
title: 渲染 tree 命令输出的树状字符串
description: 渲染另一种格式的树状字符串
order: 10
---

```html
<n-tree></n-tree>
<script>
  const el = container.querySelector('n-tree');

  el.data = `.
├── components
│   ├── @moneko
│   │   ├── README.mdx
│   │   └── 🕸sso
│   │       ├── README.mdx
│   │       └── examples
│   │           └── readme.md
│   └── index.ts
├── config
│   ├── deploy.ts
│   └── index.ts
├── jest.config.ts
├── package.json
├── tsconfig.json
└── typings
    └── typings.d.ts`;
</script>
```

```jsx
<n-tree
  data={`.
├── components
│   ├── @moneko
│   │   ├── README.mdx
│   │   └── 🕸sso
│   │       ├── README.mdx
│   │       └── examples
│   │           └── readme.md
│   └── index.ts
├── config
│   ├── deploy.ts
│   └── index.ts
├── jest.config.ts
├── package.json
├── tsconfig.json
└── typings
    └── typings.d.ts`}
/>
```
