## API

| 属性         | 说明                     | 类型                                                               | 默认值 | 版本 |
| ------------ | ------------------------ | ------------------------------------------------------------------ | ------ | ---- |
| className    | 自定义类名               | string                                                             | -      | -    |
| style        | 自定义样式表             | React.CSSProperties                                                | -      | -    |
| hitClassName | 自定义命中高亮部分的类名 | string                                                             | -      | -    |
| hitStyle     | 自定义命中高亮部分的样式 | React.CSSProperties                                                | -      | -    |
| text         | 内容                     | string                                                             | -      | -    |
| highlight    | 需要高亮的内容           | string \| ({ highlight: string; flag: HighlightFlag } \| string)[] | -      | -    |
| flag         | 正则中的 flags           | HighlightFlag                                                      | 'g'    | -    |
| extra        | 额外需要高亮的内容       | string                                                             | -      | -    |

### HighlightFlag

| 值  | 说明 |
| --- | ---- |
| g   | -    |
| i   | -    |
| m   | -    |
| u   | -    |
| y   | -    |
