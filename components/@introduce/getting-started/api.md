[TOC]

# 快速开始

> 这是一个基于 SolidJS、Typescript 开发的适用于任何技术栈的 WebComponents 组件库, 你可以在其他任意 web 框架中像 `div` 一样使用它

## 安装

```shell
npm install neko-ui -S
# or
yarn add neko-ui -S
```

## 使用

```jsx
import 'neko-ui'; // 在使用前引入一次就行, 建议在入口文件进行

function View() {
  return <n-input />;
}
```

## 直接在原生html5、js中使用

```html
<!-- 引入 CDN 资源 -->
<script src="https://cdn.jsdelivr.net/npm/neko-ui/lib/index.js"></script>
<!-- 使用 -->
<body>
  <n-input></n-input>
</body>
```
