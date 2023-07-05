---
title: 不可用状态
description: 添加 `disabled` 属性即可让按钮处于不可用状态，同时按钮样式也会改变
order: 11
---

```html
<n-button disabled="true">normal [disabled]</n-button>
<n-button type="primary" disabled="true"> primary </n-button>
<n-button disabled="true" fill="true"> fill </n-button>
<n-button disabled="true" link="true"> link </n-button>
<n-button disabled="true" type="primary" flat="true"> flat </n-button>
<n-button disabled="true" dashed="true"> dashed </n-button>
<div style="background-color: #827f7f; padding: 8px;">
  <n-button type="primary" disabled="true" ghost="true">
    ghost
    <!-- 注释 -->
  </n-button>
</div>
```

```jsx
<n-button disabled>normal [disabled]</n-button>
<n-button type="primary" disabled> primary </n-button>
<n-button disabled fill> fill </n-button>
<n-button disabled link> link </n-button>
<n-button disabled type="primary" flat> flat </n-button>
<n-button disabled dashed> dashed </n-button>
<div style={{ 'background-color': '#827f7f', padding: '8px' }}>
  <n-button type="primary" disabled ghost>
    ghost
    {/* 注释 */}
  </n-button>
</div>
```
