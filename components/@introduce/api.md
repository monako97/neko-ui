[TOC]

# 组件开发说明

!> 这里将会了解到如何开始一个新组件的开发、文档、案例demo
!> 文档将会通过源码中的 `interface`、`enum` 及对应的 `jsdoc` 实时生成

<div>

```treeview
项目根目录
`-- components
    `-- hero
        |-- index.tsx 源码
        `-- README.mdx 生成文档路由 如果你不需要文档, 可以不用创建该文件
```

</div>

## 初始

!> 下面我们开始开发一个名为 hero 的组件
!> 在项目根目录/components 下新建一个组件名命名的文件夹, 用于存放 hero 源码

## hero

在 `components` 中新建 `hero` 文件夹

### index.tsx

在 `hero` 中新建文件: `index.tsx`

```tsx
// 组件源码

/** API
 * @since 1.0.0
 */
export interface HeroProps {
  /** 自定义类名 */
  class?: string;
  /** 描述文字 */
  label: string;
}

function Hero(props: HeroProps) {
  return <div class={props.class}>{props.label}</div>;
}

export default Hero;
```

在 `components/index.ts` 文件中导出

```js
export { default as Hero, type HeroProps } from './hero';
```

#### jsdoc

| 属性    | 描述                                                            |
| ------- | --------------------------------------------------------------- |
| @since  | 该API在此版本及之后生效                                         |
| @author | 作者, 一般填写 Github 用户名, 或者邮件地址                      |
| @ignore | 不生成的列, 比如不需要 `必要` 这列单元格, 则 `@ignore optional` |

### README.mdx

文档路由, 用来生成对应的文档地址及导航菜单
在 `hero` 中新建文件: `README.mdx`

```md
---
title: 文档组件菜单标题
subtitle: 文档组件菜单副标题
type: 将文档进行分组
icon: 🔘
order: 0 # 顺序, 这部分为 yaml 语法
---

### 这是组件文档页面

> 描述
```

### examples

在 `hero` 中新建文件夹: `examples`

!> examples 下的 \*.md 文件将作为案例代码进行渲染

#### demo1.md

在 `examples` 中新建文件: `demo1.md`

```md
---
title: 这里描述代码块的标题, 比如 "最简单的使用方式"
description: 这里对代码块进行详细的说明, 每一个代码块都将作为一个完整的案例进行展示,并且可以直接在页面上修改实时渲染
order: 1 # 排序
---

<Hero label="label" />
```

## 注意事项

### cssModule

- **\*.global.less 结尾命名的文件不会启用 cssModule**

- **cssModule 使用时，样式文件中以 - 连接单词，代码中使用时应通过驼峰导入，例如**

  ```less
  // ./index.less
  .user-name {
    color: #000;
    background-color: #fff;
  }
  ```

  ```jsx
  import styles from './index.less';

  const Demo = () => {
    return <div class={styles.userName}>{styles.userName}</div>;
  };

  export default Demo;
  ```

### 文档

文档地址根据 components 下的 `README.mdx` 文件根据所在目录生成

#### gfm

- **README.mdx 中默认不支持 gfm, 比如 table，如需要如需要使用可通过以下方式导入外部.md 文件在 .mdx 文件中使用**

  ```jsx
  import readme from './readme.md?raw';

  <n-md text={readme} />;
  ```

  或者安装 [**remark-gfm**](https://www.npmjs.com/package/remark-gfm), 并在 `config/index.ts` 中配置, 这会导致 bundle 体积变大

  ```js
  import remarkGfm from 'remark-gfm';

  export default {
    mdx: {
      remarkPlugins: [remarkGfm],
    },
  };
  ```

!> 更多 api 请查看 [neko-ui](https://monako97.github.io/neko-ui) 组件
