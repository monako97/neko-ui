---
title: 自定义渲染
description: 通过数据渲染
order: 4
---

```html
<n-tree>
  <span slot="c2">
    <i style="color: pink;">是否有效</i>
    <b>boolean</b>
    <i style="flex: 1; text-align: right;">x</i>
  </span>
  <span slot="a.b">
    <i style="color: pink;">备注</i>
    <b>object</b>
    <i style="flex: 1; text-align: right;">x</i>
  </span>
</n-tree>
<script>
  const el = container.querySelector('n-tree');

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
function Demo() {
  const data = [
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

  return (
    <n-tree data={data}>
      <span slot="c2">
        <i style={{ color: 'pink' }}>是否有效</i>
        <b>boolean</b>
        <i style={{ flex: 1, textAlign: 'right' }}>x</i>
      </span>
      <span slot="a.b">
        <i style={{ color: 'pink' }}>备注</i>
        <b>object</b>
        <i style={{ flex: 1, textAlign: 'right' }}>x</i>
      </span>
    </n-tree>
  );
}
```
