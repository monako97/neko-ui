---
title: 显示数据总量
description: 通过设置 `totalText` 展示总共有多少数据。
---

```html
<h4>不显示:</h4>
<n-pagination total-text="false" page-size="10" total="85"></n-pagination>
<h4>使用插槽: slot</h4>
<n-pagination page-size="10" total="85">
  <span slot="total-text">总共 85 条数据</span>
</n-pagination>
<h4>使用函数:</h4>
<n-pagination class="func" page-size="10" total="85"></n-pagination>
<script>
  const el = container.querySelector('n-pagination.func');

  el.totalText = function (total, rangs) {
    return `${rangs.join('~')} 共 ${total} 项`;
  };
</script>
```

```jsx
<h4>不显示:</h4>
<n-pagination total-text={false} page-size={10} total={85} />
<h4>使用插槽: slot</h4>
<n-pagination page-size={10} total={85}>
  <span slot="total-text">总共 85 条数据</span>
</n-pagination>
<h4>使用函数:</h4>
<n-pagination
  page-size={10}
  total={85}
  total-text={function () {
    return function (total, rangs) {
      return `${rangs.join('~')} 共 ${total} 项`;
    };
  }}
/>
```
