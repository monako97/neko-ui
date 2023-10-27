---
title: 基本使用
description: 最简单的用法
order: 1
---

```html
<n-rive src="https://cdn.rive.app/animations/vehicles.riv" state-machines="bumpy" autoplay="true"></n-rive>
<script>
  const el = container.querySelector('n-rive');

    el.onload = function(e) {
        console.log('rive load', e);
        // riveHostedInstance.resizeDrawingSurfaceToCanvas();
    }
</script>
```

```jsx
<n-rive src="https://cdn.rive.app/animations/vehicles.riv" state-machines="bumpy" autoplay="true" />
```
