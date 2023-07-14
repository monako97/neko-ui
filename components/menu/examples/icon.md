---
title: 带图标的选项
description: 给每一项添加独特的图标
order: 3
---

```html
<n-menu></n-menu>
<script>
  const el = container.querySelector('n-menu');

  el.openKeys = ['一级菜单'];
  el.onchange = function (e) {
    console.log(e.detail);
  };
  el.addEventListener('openchange', function (e) {
    el.openKeys = e.detail;
  });
  el.items = [
    {
      label: '一级菜单',
      icon: '❤️',
      children: [
        {
          label: '动物',
          options: [
            { label: '狮子', value: '狮子', icon: '🦁', suffix: 'option' },
            { label: '大青蛙', value: '大青蛙', icon: '🐸', suffix: 'option' },
          ],
        },
        {
          label: '动物2',
          options: [
            { label: '狮子', value: '狮子2', icon: '🦁', suffix: 'option' },
            { label: '大青蛙', value: '大青蛙2', icon: '🐸', suffix: 'option' },
          ],
        },
      ],
    },
    {
      label: '二级菜单',
      icon: '👂',
      suffix: 'two',
      children: [
        {
          label: '动物3',
          options: [
            { label: '狮子', value: '狮子3', suffix: 'option' },
            { label: '大青蛙', value: '大青蛙3' },
          ],
        },
        {
          label: '动物4',
          options: [
            { label: '狮子', value: '狮子4' },
            { label: '大青蛙', value: '大青蛙4', suffix: 'option' },
          ],
        },
      ],
    },
  ];
</script>
```

```jsx
function Demo() {
  let el;
  const items = [
    {
      label: '一级菜单',
      icon: '❤️',
      children: [
        {
          label: '动物',
          options: [
            { label: '狮子', value: '狮子', icon: '🦁', suffix: 'option' },
            { label: '大青蛙', value: '大青蛙', icon: '🐸', suffix: 'option' },
          ],
        },
        {
          label: '动物2',
          options: [
            { label: '狮子', value: '狮子2', icon: '🦁', suffix: 'option' },
            { label: '大青蛙', value: '大青蛙2', icon: '🐸', suffix: 'option' },
          ],
        },
      ],
    },
    {
      label: '二级菜单',
      icon: '👂',
      suffix: 'two',
      children: [
        {
          label: '动物3',
          options: [
            { label: '狮子', value: '狮子3', suffix: 'option' },
            { label: '大青蛙', value: '大青蛙3' },
          ],
        },
        {
          label: '动物4',
          options: [
            { label: '狮子', value: '狮子4' },
            { label: '大青蛙', value: '大青蛙4', suffix: 'option' },
          ],
        },
      ],
    },
  ];

  function openChange(e) {
    el.openKeys = e.detail;
  }

  return (
    <n-menu
      ref={(e) => (el = e)}
      open-keys={['一级菜单']}
      onOpenChange={openChange}
      items={items}
    />
  );
}
```
