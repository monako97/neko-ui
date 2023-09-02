[TOC]

# 在 原生 js 和 html 中使用, 通过 `addEventListener` 进行事件绑定

当案例中的代码为

```jsx
<n-select
  label="无后缀,无前缀"
  options={[
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
  ]}
  onChange={(e) => {
    console.log(e.detail);
  }}
/>
```

## 原生 HTML 中对应的写法为

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <n-select id="select" label="无后缀,无前缀"></n-select>
  </body>
  <script>
    const select = document.querySelector('#select');

    select.options = [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
    ];
    select.addEventListener('change', function (e) {
      console.log(e.detail);
    });
  </script>
</html>
```
