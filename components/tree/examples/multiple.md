---
title: 多选模式
description: 将 `multiple` 属性设置为 `true` 来开启多选模式; 重复点击同一项时，如果已选中则取消选中。
order: 3
---

```html
<n-tree multiple="true"></n-tree>
<script>
  const el = container.querySelector('n-tree');

  el.onchange = function (e) {
    el.value = e.detail;
    console.log('html', e.detail);
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
  let el;
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
    <n-tree
      ref={(e) => (el = e)}
      data={data}
      multiple
      // 或者使用数据绑定
      value={[]}
      onChange={(e) => {
        if (el) {
          el.value = e.detail;
          console.log('jsx', e.detail);
        }
      }}
    />
  );
}
```
