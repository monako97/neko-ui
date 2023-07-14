---
title: 不同的尺寸
description: Tree 内置有大、中、小三种尺寸。通过设置 `size` 为 `large`、`small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中 `normal`。
order: 7
---

```html
<n-segmented></n-segmented>
<n-tree></n-tree>
<script>
  const segmented = container.querySelector('n-segmented');
  const tree = container.querySelector('n-tree');

  segmented.options = [
    { label: '小', value: 'small' },
    { label: '默认:中', value: 'normal' },
    { label: '大', value: 'large' },
  ];
  segmented.onchange = function (e) {
    tree.size = e.detail;
  };
  const timer = setTimeout(function () {
    clearTimeout(timer);
    segmented.value = 'normal';
  }, 32);
  tree.data = [
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

  return (
    <>
      <n-segmented
        value="normal"
        options={[
          { label: '小', value: 'small' },
          { label: '默认:中', value: 'normal' },
          { label: '大', value: 'large' },
        ]}
        onChange={(e) => {
          el.size = e.detail;
        }}
      />
      <n-tree
        ref={(e) => (el = e)}
        size="normal"
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
    </>
  );
}
```
