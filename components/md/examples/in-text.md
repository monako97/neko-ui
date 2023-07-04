---
title: 通过属性传递
description: 在 `text` 属性上传递 `markdown` 内容
order: 2
---

```html
<n-md></n-md>
<script>
  const el = container.querySelector('n-md');
  el.text = `
#### 第二种方式

!> 写在 text 属性上

![图片](https://react-photo-view.vercel.app/_next/static/media/5.7ace37c7.jpg)
`;
</script>
```

```jsx
<n-md
  text={`
#### 第二种方式

!> 写在 text 属性上

![图片](https://react-photo-view.vercel.app/_next/static/media/3.70695fb9.jpg)
`}
/>
```
