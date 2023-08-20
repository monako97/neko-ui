---
title: 分页器
description: 在表格下面添加分页器
---

```html
<n-table summary-text="当前页合计"></n-table>
<script>
  const el = container.querySelector('n-table');
  const total = 31;
  function genData(page, pageSize) {
    return Array.from(
      { length: page < total / pageSize ? pageSize : total % pageSize },
      (_, i) => ({
        name: `user ${pageSize * (page - 1) + i + 1}`,
        age: Math.round(Math.random() * 60),
      }),
    );
  }

  el.columns = { order: { type: 'order', width: 75 }, name: '用户名', age: '年龄' };
  el.pagination = {
    page: 1,
    pageSize: 3,
    total: total,
    onChange: function (page, pageSize) {
      el.data = genData(page, pageSize);
    },
  };
  el.summary = ['age'];
  el.data = genData(1, el.pagination.pageSize);
</script>
```

```jsx
function Demo() {
  let el;
  const total = 31;
  function genData(page, pageSize) {
    return Array.from(
      { length: page < total / pageSize ? pageSize : total % pageSize },
      (_, i) => ({
        name: `user ${pageSize * (page - 1) + i + 1}`,
        age: Math.round(Math.random() * 60),
      }),
    );
  }

  return (
    <n-table
      ref={(e) => (el = e)}
      columns={{ order: { type: 'order', width: 75 }, name: '用户名', age: '年龄' }}
      summary={['age']}
      summary-text="当前页合计"
      pagination={{
        page: 1,
        pageSize: 3,
        total: total,
        onChange: function (page, pageSize) {
          el.data = genData(page, pageSize);
        },
      }}
      data={genData(1, 3)}
    />
  );
}
```
