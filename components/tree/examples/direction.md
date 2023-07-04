---
title: 从右到左
description: 将 `direction` 属性设置为 `rtl` 来支持从右到左的布局;
order: 2
---

```html
<div style="display:flex;justify-content:space-between;">
  <n-tree direction="ltr" size="small"></n-tree>
  <n-tree direction="rtl" size="small"></n-tree>
</div>
<script>
  const els = container.querySelectorAll('n-tree');
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
      ],
    },
  ];
  els[0].data = data;
  els[1].data = data;
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
    <div style="display:flex;justify-content:space-between;">
      <n-tree data={data} direction="ltr" size="small" />
      <n-tree data={data} direction="rtl" size="small" />
    </div>
  );
}
```
