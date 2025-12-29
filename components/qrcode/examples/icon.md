---
title: 自定义二维码图标
description: 设置二维码的自定义图标。
---

```html
<n-qrcode
  value="https://github.com/monako97/neko-ui"
  icon="https://cdn.statically.io/gh/alrra/browser-logos@main/src/chrome/chrome.svg"
></n-qrcode>
<n-qrcode
  value="https://github.com/monako97/neko-ui"
  icon-size="26"
  icon="https://cdn.statically.io/gh/monako97/cdn@main/image/202307281703208.svg"
></n-qrcode>
```

```jsx
<n-qrcode value="https://github.com/monako97/neko-ui" icon-size="40" type="canvas" icon="https://cdn.statically.io/gh/alrra/browser-logos@main/src/chrome/chrome.svg" />
<n-qrcode value="https://github.com/monako97/neko-ui" icon-size="26" icon="https://cdn.statically.io/gh/monako97/cdn@main/image/202307281703208.svg" />
```
