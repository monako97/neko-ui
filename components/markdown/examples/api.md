## API

| 属性               | 说明             | 类型                | 默认值         | 版本 |
| ------------------ | ---------------- | ------------------- | -------------- | ---- |
| className          | 自定义类名       | string              | -              | -    |
| style              | 自定义样式表     | React.CSSProperties | -              | -    |
| text               | md 内容          | string              | @primary-color | -    |
| pictureViewer      | 图片查看器       | boolean             | true           | -    |
| langLineNumber     | 显示代码行号     | boolean             | true           | -    |
| tools              | 开启代码块工具条 | ToolType[]          | ['copy']       | -    |
| getAnchorContainer | 指定滚动的容器   | () => HTMLElement   | () => window   | -    |

## ToolType

- copy
