---
title: 显示时间选择
description: 设置 `type` 为 `date` 将面板调整为日期选择, 并设置 `show-time` 为 `true`
order: 5
---

```html
<n-data-picker type="date" show-time="true"></n-data-picker>
<h4>不选时</h4>
<n-data-picker type="date" show-time="true" show-hour="false"></n-data-picker>
```

```jsx
<n-data-picker type="date" show-time={true} value="2023-08-08 06:06:53" />
```
