---
title: 前缀 & 后缀
description: 通过 `default-value` 属性设置默认值
order: 1
---

```html
<div style="display:flex;gap:10px;flex-direction:column;">
  <n-select default-value="C" suffix-icon="😅" prefix-icon="🌞" label="后缀,前缀"></n-select>
  <n-select suffix-icon="🌞" label="带后缀,无前缀"></n-select>
  <n-select multiple="true" prefix-icon="🌞" label="后缀,前缀"></n-select>
  <n-select prefix-icon="🌞" label="带前缀,无后缀"></n-select>
  <n-select multiple="true" label="带后缀,无前缀" suffix-icon="🌞"></n-select>
  <n-select multiple="true" prefix-icon="🌞" label="带前缀,无后缀"></n-select>
  <n-select></n-select>
</div>
<script>
  const els = container.querySelectorAll('n-select');
  els[2].suffixIcon = function () {
    const a = document.createElement('div');

    a.innerHTML = `<n-popover arrow="true" content="这是一个提示">🔔</n-popover>`;
    return a.firstElementChild;
  };
  for (var i = els.length - 1; i >= 0; i--) {
    els[i].options = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    els[i].placeholder = '请选择';
  }
</script>
```

```jsx
const opts = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

render(
  <div
    style={{
      display: 'flex',
      gap: '10px',
      'flex-direction': 'column',
    }}
  >
    <n-select
      default-value="C"
      suffix-icon="😅"
      prefix-icon={
        <n-popover arrow content="这是一个提示">
          😅
        </n-popover>
      }
      label="后缀,前缀"
      options={opts}
      placeholder="请选择"
    />
    <n-select suffix-icon="🌞" label="带后缀,无前缀" options={opts} placeholder="请选择" />
    <n-select
      multiple
      label="后缀,前缀"
      suffix-icon={
        <n-popover arrow content="这是一个提示">
          🔔
        </n-popover>
      }
      prefix-icon="🌞"
      options={opts}
      placeholder="请选择"
    />
    <n-select prefix-icon="🌞" label="带前缀,无后缀" options={opts} placeholder="请选择" />
    <n-select multiple label="带后缀,无前缀" suffix-icon="🌞" options={opts} placeholder="请选择" />
    <n-select multiple prefix-icon="🌞" label="带前缀,无后缀" options={opts} placeholder="请选择" />
    <n-select placeholder="请选择" />
  </div>
);
```
