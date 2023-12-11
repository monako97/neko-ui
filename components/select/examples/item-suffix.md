---
title: 给选项添加后缀
description: 可以使用 `suffix` 给选项添加一个描述
order: 8
---

```html
<n-select default-value="3" placeholder="请选择"></n-select>
<script>
  const el = container.querySelector('n-select');
  el.options = [
    {
      label: '人员',
      suffix: () => {
        // 可以是一个函数, 返回 dom
        const add = document.createElement('n-popover');

        add.textContent = '?';
        add.style.cursor = 'pointer';
        add.content = '这里是人员列表';
        add.arrow = true;
        add.onmousedown = function (e) {
          e.stopPropagation();
          e.preventDefault();
        };
        return add;
      },
      children: [
        // 也可以是string
        { value: 1, label: '张三', suffix: 'zhangsan' },
        { value: 2, label: '李四', suffix: 'lishi' },
        { value: 3, label: '王五', suffix: 'wangwu' },
      ],
    },
    {
      label: '其他',
      options: [
        // 也可以是string
        { value: '11', label: '张三', suffix: 'zhangsan' },
        { value: '22', label: '李四', suffix: 'lishi' },
        { value: '33', label: '王五', suffix: 'wangwu' },
      ],
    },
  ];
</script>
```

```jsx
<n-select
  default-value="3"
  placeholder="请选择"
  options={[
    {
      label: '人员',
      suffix: () => (
        <n-popover
          arrow={true}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          content={<strong style={{ padding: '16px' }}>这里是人员列表</strong>}
        >
          ?
        </n-popover>
      ),
      children: [
        { value: '1', label: '张三', suffix: 'zhangsan' },
        { value: '2', label: '李四', suffix: 'lishi' },
        { value: '3', label: '王五', suffix: 'wangwu' },
      ],
    },
    {
      label: '其他',
      options: [
        // 也可以是string
        { value: '11', label: '张三', suffix: 'zhangsan' },
        { value: '22', label: '李四', suffix: 'lishi' },
        { value: '33', label: '王五', suffix: 'wangwu' },
      ],
    },
  ]}
/>
```
