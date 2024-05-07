---
title: 自定义字段名
description: 自定义节点 'title'、'key' 等字段
order: 11
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
        code: Math.random().toString(32).slice(2),
        name: '新字段',
        subTitle: '(new)',
      },
    ];
  };
  el.fieldNames = {
    title: 'name',
    key: 'code',
  };
  el.data = [
    {
      name: '文件名称',
      subTitle: 'object',
      code: 'a',
      children: [
        {
          name: '备注',
          subTitle: 'object',
          code: 'a.b',
          children: [
            {
              name: '备注',
              subTitle: 'string',
              code: 'a.b.x',
            },
          ],
        },
      ],
    },
    {
      name: '编号',
      subTitle: 'object',
      code: 'b',
      children: [
        {
          name: '备注',
          subTitle: 'string',
          code: 'b2',
        },
        {
          name: '是否有效',
          subTitle: 'boolean',
          code: 'c2',
        },
      ],
    },
  ];
</script>
```

```jsx
<n-tree
  field-names={{
    title: 'name',
    key: 'code',
  }}
  data={[
    {
      name: '文件名称',
      subTitle: 'object',
      code: 'a',
      children: [
        {
          name: '备注',
          subTitle: 'object',
          code: 'a.b',
          children: [
            {
              name: '备注',
              subTitle: 'string',
              code: 'a.b.x',
            },
          ],
        },
      ],
    },
    {
      name: '编号',
      subTitle: 'object',
      code: 'b',
      children: [
        {
          name: '备注',
          subTitle: 'string',
          code: 'b2',
        },
        {
          name: '是否有效',
          subTitle: 'boolean',
          code: 'c2',
        },
      ],
    },
  ]}
/>
```
