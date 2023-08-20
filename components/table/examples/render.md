---
title: 自定义渲染单元格
description: 使用 `render` 函数自定义渲染单元格
---

```html
<n-table title="表格标题"></n-table>
<script>
  const el = container.querySelector('n-table');

  el.columns = {
    name: '用户名',
    gender: {
      label: '性别',
      render: function (val) {
        return ['女', '男'][val] || '未知';
      },
    },
    alive: {
      label: '状态',
      render: function (val) {
        const tag = document.createElement('n-tag');

        tag.type = val ? 'success' : 'error';
        tag.textContent = val ? '在线' : '离线';
        return tag;
      },
    },
    actions: {
      label: '操作',
      render: function (_, record) {
        const btn = document.createElement('n-button');

        btn.link = true;
        btn.type = 'primary';
        btn.textContent = '编辑';
        btn.onclick = function () {
          console.log(record);
        };
        return btn;
      },
    },
  };
  el.data = [
    { name: 'user 1', gender: 1, alive: false },
    { name: 'user 2', gender: 0, alive: true },
    { name: 'user 3', gender: null, alive: false },
  ];
</script>
```

```jsx
<n-table
  title="表格标题"
  columns={{
    name: '用户名',
    gender: {
      label: '性别',
      render: function (val) {
        return ['女', '男'][val] || '未知';
      },
    },
    alive: {
      label: '状态',
      render: function (val) {
        return <n-tag type={val ? 'success' : 'error'}>{val ? '在线' : '离线'}</n-tag>;
      },
    },
    actions: {
      label: '操作',
      render: function (_, record) {
        return (
          <n-button
            type="primary"
            link={true}
            onClick={function () {
              console.log(record);
            }}
          >
            编辑
          </n-button>
        );
      },
    },
  }}
  data={[
    { name: 'user 1', gender: 1, alive: false },
    { name: 'user 2', gender: 0, alive: true },
    { name: 'user 3', gender: null, alive: false },
  ]}
/>
```
