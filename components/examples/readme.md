
# [TOC]

## 注意事项

- ***.global.less 表示该文件不会使用cssModule解析，如果需要使用cssModule，文件不要以.global.less结尾**

- **cssModule使用时，样式文件中以 - 连接单词，代码中使用时应通过驼峰导入，例如**

    ```css
    .user-name {
        color: #000;
    }
    ```

    ```jsx
    import styles from './index.less';
    
    console.log(styles.userName);
    ```

- **components中的组件源码，开发中不能导入node_modules及components文件夹之外的代码，以及不能导入README.mdx和examples命名的文件夹下的代码，编译后不包含 README.mdx和examples**

- **README.mdx 不支持 gmf，比如table，如需要如需要使用可通过以下方式导入外部.md文件在 .mdx文件中使用**

  ```jsx
  import MBox from '@/components/markdown';
  import readme from './readme.md?raw';

  <MBox text={readme} />
  ```

- **README.mdx 文件中需要添加如下代码**

  ```js
  export const basic = {
    title: '状态标识组件',    // 文档组件菜单标题
    subtitle: 'StatusTag',  // 文档组件菜单副标题
  }
  ```

## 读取文件并展示出文件代码

```jsx
import CodeBlock from '@/components/code';
import DemoRaw from './examples/default.jsx?raw';

<CodeBlock code={DemoRaw} lang="jsx" />
```

## 在.mdx中通过 案例代码path （components目录下代码所在位置） 预览组件及案例代码Snapshot

```jsx
import Snapshot from '@/components/snapshot';

// 案例1
<Snapshot path="tag/examples/default" lang="jsx" />
// 案例2
<Snapshot path="tag/examples/bg" lang="tsx" />
```

## 直接在 mdx 中编写文档

```md
### 这是md

// 这是jsx
// neko-ui 这里表示的是当前项目 package.json 中的 name
import { Tag } from 'neko-ui';

<div style={{ display: 'flex', height: 300 }}>
    <Tag>默认</Tag>
</div>


```

- [X] $a_i$
- [ ] `${x}_{2}$,${x}_{2}$`

## KaTeX

$a=x+y$

$a^i$

$x_{22}y\^{(x)}x\^{y^z}$

$\frac{1}{a}$

$\sqrt{xy}+\sqrt[a]{x}$

$a_{i\ldots{n}}$

$\frac{du}{dx}$

$\sum_{k=1}^nkx$

$\int_a^b$

$\sum\limits_{k=1}^nkx$

$\sum\nolimits_{k=1}^nkx$

$\overline{a+b}$

$\underline{a+b}$

$\overbrace{a+b+\dots+n}^{m个}$|

$\underbrace{a+b+\dots+n}_{m个}$

$\vec{a}$
