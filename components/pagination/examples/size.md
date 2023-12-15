---
title: 不同的尺寸
description: Pagination 内置有大、中、小三种尺寸。通过 `size` 进行设置; 默认为 'normal'。
order: 4
---

```html
<h4>小:</h4>
<n-pagination page-size="15" total="85" size="small"></n-pagination>
<h4>默认: 中</h4>
<n-pagination page-size="15" total="85" size="normal"></n-pagination>
<h4>大:</h4>
<n-pagination page-size="15" total="85" size="large"></n-pagination>
```

```jsx
<h4>小:</h4>
<n-pagination page-size={15} total={85} size="small" />
<h4>默认: 中</h4>
<n-pagination page-size={15} total={85} size="normal" />
<h4>大:</h4>
<n-pagination page-size={15} total={85} size="large" />
```
