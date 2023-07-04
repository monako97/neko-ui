## API

!> [点击查看 KaTex 完整配置项](https://katex.org/docs/options.html)

| 属性                | 说明                                                     | 类型                                              | 默认值          | 版本 |
| ------------------- | -------------------------------------------------------- | ------------------------------------------------- | --------------- | ---- |
| display-mode        | 显示模式下                                               | `boolean`                                         | `false`         | -    |
| output              | 确定输出的标记语言                                       | `html` \| `htmlAndMathml` \| `mathml`             | `htmlAndMathml` | -    |
| leqno               | 如果`true`, 显示数学的`\tag`呈现在左侧而不是右侧         | `boolean`                                         | -               | -    |
| fleqn               | 如果`true`, 则显示数学用`a2em`左边距渲染刷新左           | `boolean`                                         | -               | -    |
| throw-on-error      | 抛出错误                                                 | `boolean`                                         | `true`          | -    |
| error-color         | 当`throwOnError`设置为`false`时, 无效的`LaTeX`呈现的颜色 | `string`                                          | `#cc0000`       | -    |
| min-rule-thickness  | 线的边界指定最小厚度                                     | `number`                                          | -               | -    |
| color-is-text-color | `\color`行为                                             | `boolean`                                         | -               | -    |
| strict              | 严格模式                                                 | `boolean`                                         | -               | -    |
| max-size            | All user-specified sizes                                 | `number`                                          | -               | -    |
| max-expand          | 将宏扩展的数量限制在指定数量，以防止例如无限的宏循环     | `number`                                          | 1000            | -    |
| trust               | command                                                  | `boolean` \| `(context: TrustContext) => boolean` | -               | -    |
| global-group        | Run KaTeX code in the global group.                      | `boolean`                                         | -               | -    |
| macros              | 自定义宏的集合                                           | `object`                                          | -               | -    |

### TrustContext

| 属性     | 类型     |
| -------- | -------- |
| command  | `string` |
| url      | `string` |
| protocol | `string` |
