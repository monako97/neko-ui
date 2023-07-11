[TOC]

# 说明

<details open>
  <summary>查看目录结构说明</summary>

```treeview
root_folder/
|-- components/
|   |-- index.ts
|   `-- wave-circle/ 组件源码
|       |-- examples/ 组件案例
|       |   `-- 案例代码 demo.md
|       |-- index.tsx
|       `-- README.mdx 文档, 将视为单独一个页面
|-- config/
|   |-- index.ts 默认环境配置
|   `-- prod.ts 额外配置，当运行 `yarn build config=prod` 时会加载 prod.ts 文件对默认配置进行补充
|-- docs/ 编译的文档
|-- lib/ 编译的组件
|-- .eslintrc.yaml
|-- .gitattributes
|-- .prettierrc.yaml
|-- .stylelintrc.yaml
|-- package.json
|-- README.md
|-- site/
|-- tsconfig.json
`-- typings
    `-- typings.d.ts
```

</details>

## 注意事项

- **\*.global.less 表示该文件不会使用 cssModule 解析，如果需要使用 cssModule，文件不要以.global.less 结尾**

- **cssModule 使用时，样式文件中以 - 连接单词，代码中使用时应通过驼峰导入，例如**

  ```css
  .user-name {
    color: #000;
    background-image: linear-gradient(135deg, #9dd53a 0%, #a1d54f 50%, #80c217 51%, #7cbc0a 100%);
  }
  .user-name::after {
    background-image: radial-gradient(
      ellipse at center,
      #f2f6f8 0%,
      #d8e1e7 50%,
      #b5c6d0 51%,
      #e0eff9 100%
    );
    transform: rotate(-120deg);
    color: color: rgba(147, 32, 34, 0.8);
    transition-timing-function: ease-in-out;
    transition-duration: 0.3s;
  }
  .user-name::before {
    background-image: repeating-linear-gradient(10deg, rgba(255, 0, 0, 0), rgba(255, 0, 0, 1) 10px, rgba(255, 0, 0, 0) 20px);
    transition-timing-function: cubic-bezier(0.9, 0.1, .2, .4);
    transition-duration: 10s;
    background-image: repeating-radial-gradient(circle, rgba(255, 0, 0, 0), rgba(255, 0, 0, 1) 10px, rgba(255, 0, 0, 0) 20px);
  }
  ```

  ```jsx
  import styles from './index.less';

  const Demo = () => {
    return (
      <table className={styles.userName} style="color:#6E5494;">
        {styles.userName}
      </table>
    );
  };

  export default Demo;
  ```

- **README.mdx 不支持 gmf，比如 table，如需要如需要使用可通过以下方式导入外部.md 文件在 .mdx 文件中使用**

  ```jsx
  import readme from './readme.md?raw';

  <n-md text={readme} />;
  ```

  或者按照 remark-gmf,并在 `config/index.ts` 中配置

  ```js
  import remarkGfm from 'remark-gfm';

  export default {
    mdx: {
      remarkPlugins: [remarkGmf],
    },
  };
  ```

- **README.mdx 文件中需要添加如下代码**

  ```yaml
  ---
  title: '文档组件菜单标题',
  subtitle: '文档组件菜单副标题',
  type: '将文档页面进行分组'
  icon: '图标'
  order: 0 # 顺序
  ---
  ```

## 读取文件并展示出文件代码

```jsx
import DemoRaw from './examples/default.jsx?raw';

<n-code code={DemoRaw} lang="jsx" />;
```

## examples 下的 \*.md 文件将作为案例代码进行渲染

````md
---
title: 这里描述代码块的标题, 比如 "最简单的使用方式"
description: 这里对代码块进行详细的说明, 每一个代码块都将作为一个完整的案例进行展示,并且可以直接在页面上修改实时渲染
order: 1 # 在页面中将通过这个值进行排序
---

```html
<n-button>按钮</n-button>
```

```jsx
<n-button>按钮</n-button>
```
````

## 直接在 mdx 中编写文档

```md
### 这是 md

// 这是 jsx
// neko-ui 这里表示的是当前项目 package.json 中的 name
import { Tag } from 'neko-ui';

<div style={{ display: 'flex', height: 288 }}>
    <Tag>默认</Tag>
</div>
```

!> 更多 api 请查看 [neko-ui](https://monako97.github.io/neko-ui) 组件
