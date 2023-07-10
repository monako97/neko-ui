---
title: 自定义渲染
description: 通过`renderRow`函数自定义渲染每一行的内容
order: 4
---

```html
<n-tree></n-tree>
<script>
  const el = container.querySelector('n-tree');

  el.renderRow = function (item, title, subTitle) {
    const _tit = document.createElement('span'),
      _close = document.createElement('i');

    _tit.style.color = 'pink';
    _tit.textContent = item.title;
    _close.style.flex = 1;
    _close.style.textAlign = 'right';
    _close.textContent = 'x';

    return [_tit, subTitle, _close];
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

  function renderRow(item, title, subTitle) {
    return [
      <span style={{ color: 'red' }}>{item.title}</span>,
      subTitle,
      <i style={{ flex: 1, 'text-align': 'right' }}>x</i>,
    ];
  }
  return <n-tree data={data} render-row={() => renderRow} />;
}
```
