[home-url]: https://monako97.github.io/neko-ui
[home-tag]: https://cdn.statically.io/gh/monako97/cdn/main/image/202307281703208.svg
[jetbrains-tag]: https://cdn.statically.io/gh/monako97/cdn/main/image/202307281758090.svg
[jetbrains-url]: https://www.jetbrains.com/?from=monako
[docs-url]: https://monako97.github.io/neko-ui
[docs-tag]: https://cdn.statically.io/gh/monako97/cdn/main/image/202307281701250.svg
[npm-url]: https://npmjs.org/package/neko-ui
[cli-url]: https://www.npmjs.com/package/create-mo
[cli-tag]: https://nodei.co/npm/create-mo.png
[install-tag]: https://nodei.co/npm/neko-ui.png
[version-tag]: https://img.shields.io/npm/v/neko-ui/latest.svg?logo=npm
[size-tag]: https://packagephobia.com/badge?p=neko-ui@latest
[size-url]: https://packagephobia.com/result?p=neko-ui@latest
[download-tag]: https://img.shields.io/npm/dm/neko-ui.svg?logo=docusign
[x-tag]: https://img.shields.io/twitter/follow/moneko97.svg?style=social

# Neko UI

🐾 🐾 🐾 🐾

> 这是一个基于 SolidJS、Typescript 开发的适用于任何技术栈的 WebComponents 组件库, 你可以在其他任意 web 框架中像 `div` 一样使用它

[![neko-ui][home-tag]][home-url]
[![docs-ui][docs-tag]][docs-url]

[![version][version-tag]][npm-url]
[![install size][size-tag]][size-url]
[![download][download-tag]][npm-url]
![x][x-tag]

[![neko-ui][install-tag]][npm-url]

## 安装

```shell
npm install neko-ui -S
# or
yarn add neko-ui -S
# or
pnpm add neko-ui -S
```

### 使用

```html
<n-button>按钮</n-button>
```

## 在 html5 中使用

```html
<!-- 引入 CDN 资源 -->
<script src="https://cdn.jsdelivr.net/npm/neko-ui/umd/index.js"></script>
<!-- 使用 -->
<body>
  <n-button>按钮</n-button>
</body>
```

## 按需引入

### 手动方式

```jsx
// 按需引入
import 'neko-ui/es/button';
import 'neko-ui/es/date-picker';
// 全量引入
// import 'neko-ui';

// 使用
function Demo() {
  return (
    <div>
      <n-button>按钮</n-button>
      <n-date-picker></n-date-picker>
    </div>
  );
}
```

### 使用 @moneko

```typescript
// config/index.ts
import type { ConfigType } from '@moneko/core';

const conf: Partial<ConfigType> = {
  // 按需引入
  importOnDemand: {
    'neko-ui': {
      transform: 'es/${member}',
      memberTransformers: ['dashed_case'],
    },
  },
};

export default conf;
```

> 文档通过 @moneko/core 生成

[![@moneko/core][cli-tag]][cli-url]

## 支持浏览器

[edge]: https://cdn.statically.io/gh/alrra/browser-logos/main/src/edge/edge.svg
[chrome]: https://cdn.statically.io/gh/alrra/browser-logos/main/src/chrome/chrome.svg
[firefox]: https://cdn.statically.io/gh/alrra/browser-logos/main/src/firefox/firefox.svg
[safari]: https://cdn.statically.io/gh/alrra/browser-logos/main/src/safari/safari.svg
[opera]: https://cdn.statically.io/gh/alrra/browser-logos/main/src/opera/opera.svg
[samsung]: https://cdn.statically.io/gh/alrra/browser-logos/main/src/samsung-internet/samsung-internet.svg

| ![Edge][edge] | ![Firefox][firefox] | ![Chrome][chrome] | ![Safari][safari] | ![Samsung][samsung] | ![Opera][opera] |
| :-----------: | :-----------------: | :---------------: | :---------------: | :-----------------: | :-------------: |
|   Edge 16+    |         70+         |        78+        |       10.1+       |        8.2+         |       48+       |

![backer][opencollective-backer]
![sponsor][opencollective-sponsor]

## 感谢

[![jetbrains][jetbrains-tag]][jetbrains-url]

[opencollective-backer]: https://opencollective.com/neko-ui/tiers/backer.svg?avatarHeight=56&width=120
[opencollective-sponsor]: https://opencollective.com/neko-ui/tiers/sponsor.svg?avatarHeight=56&width=120
