---
title: 二维码纠错比例
description: 通过设置 ECL（错误纠正等级）来调整二维码的容错能力。
---

```html
<n-qrcode ecl="l"></n-qrcode>
<n-input value="https://github.com/monako97/neko-ui"></n-input>
<n-segmented default-value="l"></n-segmented>
<script>
  const segmented = container.querySelector('n-segmented');
  const qrcode = container.querySelector('n-qrcode');
  const input = container.querySelector('n-input');

  segmented.options = [
    { label: 'Low', value: 'l' },
    { label: 'MEDIUM', value: 'm' },
    { label: 'QUARTILE', value: 'q' },
    { label: 'HIGH', value: 'h' },
  ];
  segmented.onchange = function (e) {
    qrcode.ecl = e.detail;
  };
  input.onchange = function (e) {
    qrcode.value = e.detail;
  };
  qrcode.value = input.value;
</script>
```

```jsx
<n-qrcode value="https://github.com/monako97/neko-ui" ecl="l" />
```
