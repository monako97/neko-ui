## API

| 属性      | 说明               | 类型                                                               | 默认值 | 版本 |
| --------- | ------------------ | ------------------------------------------------------------------ | ------ | ---- |
| class     | 自定义类名         | string                                                             | -      | -    |
| css       | 自定义样式表       | string                                                             | -      | -    |
| text      | 内容               | string                                                             | -      | -    |
| highlight | 需要高亮的内容     | string、 ({ highlight: string; flag: `HighlightFlag` }、 string)[] | -      | -    |
| flag      | 正则中的 flags     | `HighlightFlag`                                                    | 'g'    | -    |
| extra     | 额外需要高亮的内容 | string                                                             | -      | -    |

### HighlightFlag

| HighlightFlag |
| ------------- |
| `g`           |
| `i`           |
| `m`           |
| `u`           |
| `y`           |
