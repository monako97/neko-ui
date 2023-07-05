---
title: 自定义格式
description: 通过 `formatter` 和 `parser` 来自定义输入栏显示内容
order: 2
---

```html
<n-input-number label="完成度" min="0" max="1" step="0.01"></n-input-number>
<script>
  const el = container.querySelector('n-input-number');

  el.formatter = function (v = 0) {
    return `${Number((v * 100).toFixed(2))}%`;
  };
  el.parser = function (v = '') {
    return Number(v.replace(/%$/, '') || '0') / 100;
  };
</script>
```

```jsx
<n-input-number
  label="完成度"
  min={0}
  max={1}
  step={0.01}
  formatter={() => (v = 0) => `${Number((v * 100).toFixed(2))}%`}
  parser={() => (v = '0%') => Number(v.replace(/%$/, '')) / 100}
/>
```
