---
title: 基本使用
description: 一般情况下，我们只需要传入 `data` 数据进行渲染
order: 1
---

```html
<n-button size="small" type="primary">点击添加字段</n-button>
<n-tree></n-tree>
<script>
  const el = container.querySelector('n-tree');
  const btn = container.querySelector('n-button');

  btn.onclick = function () {
    el.data = [
      ...el.data,
      {
        key: Math.random().toString(32).slice(2),
        name: 'new Field',
        title: '新字段',
        subTitle: '(new)',
        s: 1,
      },
    ];
  };
  el.data = [
    {
      title: '文件名称',
      subTitle: 'object',
      key: 'a',
      children: [
        {
          title: '备注',
          subTitle: 'object',
          key: 'a.b',
          children: [
            {
              title: '备注',
              subTitle: 'string',
              key: 'a.b.x',
            },
          ],
        },
      ],
    },
    {
      title: '编号',
      subTitle: 'object',
      key: 'b',
      children: [
        {
          title: '备注',
          subTitle: 'string',
          key: 'b2',
        },
        {
          title: '是否有效',
          subTitle: 'boolean',
          key: 'c2',
        },
      ],
    },
  ];
</script>
```

```jsx
<n-tree
  data={[
    {
      title: '文件名称',
      subTitle: 'object',
      key: 'a',
      children: [
        {
          title: '备注',
          subTitle: 'object',
          key: 'a.b',
          children: [
            {
              title: '备注',
              subTitle: 'string',
              key: 'a.b.x',
            },
          ],
        },
      ],
    },
    {
      title: '编号',
      subTitle: 'object',
      key: 'b',
      children: [
        {
          title: '备注',
          subTitle: 'string',
          key: 'b2',
        },
        {
          title: '是否有效',
          subTitle: 'boolean',
          key: 'c2',
        },
      ],
    },
  ]}
/>
```
