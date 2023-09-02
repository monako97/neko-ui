[TOC]

# 在 Vue 中使用

当案例中的代码为

```jsx
<n-input onChange={(e) => console.log(e)} />
```

在 `Vue` 中, 事件绑定需要将 onXxx 替换为 @xxx

## 忽略自定义元素

你需要先在入口处(常见为`app.js`)添加这段代码

### Vue 2

```js
Vue.config.ignoredElements = [
  // 忽略所有“ion-”开头的元素 (仅在 vue 2.5+ 支持)
  /^n-[a-z]/,
  // 或指定名称, 忽略 n-input 元素
  'n-input',
];
```

### Vue 3

```js
const app = Vue.createApp({});

app.config.isCustomElement = (tag) => /^n-[a-z]/.test(tag);
```

## Vue 中对应的写法为

```html
<template>
  <n-input @change="handleChange" />
</template>
<script>
  export default {
    data() {
      return {};
    },
    methods: {
      handleChange(e) {
        console.log(e.detail);
      },
    },
  };
</script>
```
