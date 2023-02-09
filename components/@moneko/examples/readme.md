[TOC]

# 注意事项

- **\*.global.less 表示该文件不会使用 cssModule 解析，如果需要使用 cssModule，文件不要以.global.less 结尾**

- **cssModule 使用时，样式文件中以 - 连接单词，代码中使用时应通过驼峰导入，例如**

  ```css
  .user-name {
    color: #000;
  }
  ```

  ```jsx
  import styles from './index.less';

  const Demo = () => {
    return <div className={styles.userName}>{styles.userName}</div>;
  };

  export default Demo;
  ```

- **components 中的组件源码，开发中不能导入 node_modules 及 components 文件夹之外的代码，以及不能导入 README.mdx 和 examples 命名的文件夹下的代码，编译后不包含 README.mdx 和 examples**

- **README.mdx 不支持 gmf，比如 table，如需要如需要使用可通过以下方式导入外部.md 文件在 .mdx 文件中使用**

  ```jsx
  import readme from './readme.md?raw';

  <Box text={readme} />;
  ```

- **README.mdx 文件中需要添加如下代码**

  ```js
  export const basic = {
    title: '状态标识组件', // 文档组件菜单标题
    subtitle: 'StatusTag', // 文档组件菜单副标题
  };
  ```

## 读取文件并展示出文件代码

```jsx
import DemoRaw from './examples/default.jsx?raw';

<CodeBlock code={DemoRaw} lang="jsx" />;
```

## 在.mdx 中通过 组件文件夹 name （components 目录下代码所在位置） 预览组件案例及代码 Snapshot

```md
// 案例 1

<Snapshot name="wave-circle" />
```

## 直接在 mdx 中编写文档

```md
### 这是 md

// 这是 jsx
// neko-ui 这里表示的是当前项目 package.json 中的 name
import { Tag } from 'neko-ui';

<div className="n-flex n-h-72">
    <Tag>默认</Tag>
</div>
```
