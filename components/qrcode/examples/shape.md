---
title: 二维码模块形状
description: 设置二维码的模块形状。
col: 100%
---

```html
<p>svg</p>
<n-qrcode value="mode is rect"></n-qrcode>
<n-qrcode ecl="l" value="mode is heart" color="red" shape="heart"></n-qrcode>
<n-qrcode value="mode is rhombus" color="yellow" bg-color="green" shape="rhombus"></n-qrcode>
<n-qrcode value="mode is circle" color="blue" bg-color="#fff" shape="circle"></n-qrcode>
<p>canvas</p>
<n-qrcode value="mode is rect" shape="rect" type="canvas"></n-qrcode>
<n-qrcode ecl="l" value="mode is heart" color="red" shape="heart" type="canvas" ></n-qrcode>
<n-qrcode value="mode is rhombus" color="yellow" bg-color="green" type="canvas" shape="rhombus"></n-qrcode>
<n-qrcode value="mode is circle" color="blue" bg-color="#fff" type="canvas" shape="circle"></n-qrcode>
```
