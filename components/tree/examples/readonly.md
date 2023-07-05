---
title: 只读模式
description: 通过设置 `readonly` 属性来开启只读模式, 不会触发 `onchange` 事件
order: 7
---

```html
<n-tree readonly="true" value="fileName.code"></n-tree>
<script>
  const el = container.querySelector('n-tree');

  el.onchange = function (e) {
    // 不会触发
    console.log(e);
  };
  el.data = [
    {
      title: '文件地址',
      subTitle: 'fileAddr',
      key: 'fileAddr',
    },
    {
      subTitle: 'fileName',
      title: '文件名称',
      key: 'fileName',
      children: [
        {
          title: '编号',
          subTitle: 'fileName.code',
          key: 'fileName.code',
        },
      ],
    },
    {
      title: '编号',
      subTitle: 'code',
      key: 'code',
      children: [
        {
          title: '是否有效',
          subTitle: 'valid',
          key: 'valid',
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
      title: '文件地址',
      subTitle: 'fileAddr',
      key: 'fileAddr',
    },
    {
      subTitle: 'fileName',
      title: '文件名称',
      key: 'fileName',
      children: [
        {
          title: '编号',
          subTitle: 'fileName.code',
          key: 'fileName.code',
        },
      ],
    },
    {
      title: '编号',
      subTitle: 'code',
      key: 'code',
      children: [
        {
          title: '是否有效',
          subTitle: 'valid',
          key: 'valid',
        },
      ],
    },
  ]}
  value="fileName.code"
  readonly
  onChange={(e) => {
    // 不会触发
    console.log(e);
  }}
/>
```
