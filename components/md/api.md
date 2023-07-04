## API

| 属性               | 说明             | 类型                | 默认值         | 版本 |
| ------------------ | ---------------- | ------------------- | -------------- | ---- |
| class              | 自定义类名       | string              | -              | -    |
| css                | 自定义样式表     | `CSSProperties`     | -              | -    |
| text               | md 内容          | string              | -              | -    |
| pictureViewer      | 图片查看器       | boolean             | true           | -    |
| lineNumber         | 显示代码行号     | boolean             | true           | -    |
| tools              | 开启代码块工具条 | `ToolType`[]        | ['copy']       | -    |
| getAnchorContainer | 指定滚动的容器   | () => `HTMLElement` | () => `window` | -    |

## ToolType

- `copy`
