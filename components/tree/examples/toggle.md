---
title: 重复点击取消选中
description: 通过设置`toggle`属性来开启取消选中, 仅支持单选模式; 重复点击同一项时，如果已选中则取消选中。
order: 6
---

```html
<n-tree toggle="true"></n-tree>
<script>
  const el = container.querySelector('n-tree');

  el.onchange = function (e) {
    const [key, item] = e.detail;
  
    el.value = key;
    console.log(item);
  };
  el.data = [
    {
      title: '文件地址',
      subTitle: 'fileAddr',
      key: 'fileAddr',
    },
    {
      title: '编号',
      subTitle: 'channelCustNum',
      key: 'channelCustNum',
    },
    {
      title: '编号2',
      subTitle: 'string',
      key: 'string',
    },
  ];
</script>
```

```jsx
function Demo() {
  let el;
  return (
    <n-tree
      ref={(e) => (el = e)}
      toggle
      onChange={(e) => {
        const [key, item] = e.detail;

        el.value = key;
        console.log(item);
      }}
      data={[
        {
          title: '文件地址',
          subTitle: 'fileAddr',
          key: 'fileAddr',
        },
        {
          title: '编号',
          subTitle: 'channelCustNum',
          key: 'channelCustNum',
        },
        {
          title: '编号2',
          subTitle: 'string',
          key: 'string',
        },
      ]}
    />
  );
}
```
