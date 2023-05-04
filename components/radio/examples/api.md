## API

| 属性      | 说明                               | 类型                                 | 默认值       | 版本  |
| --------- | ---------------------------------- | ------------------------------------ | ------------ | ----- |
| className | 自定义类名                         | `string`                             | -            | 1.3.0 |
| style     | 自定义样式表                       | `React.CSSProperties`                | -            | 1.3.0 |
| name      | `input[type="radio"]` 的 name 属性 | `string`                             | -            | 1.3.0 |
| value     | 值                                 | `string` \| `number`                 | -            | 1.3.0 |
| disabled  | 只读                               | `boolean`                            | -            | 1.3.0 |
| onChange  | 值修改时的回调方法                 | (open: `string` \| `number`) => void | -            | 1.3.0 |
| options   | 选项数据                           | `RadioOption[]`                      | `[]`         | 1.3.0 |
| layout    | 选项排列方式                       | `vertical` \| `horizontal`           | `horizontal` | 1.3.0 |

### RadioOption

| 属性      | 说明         | 类型                  | 默认值 | 版本  |
| --------- | ------------ | --------------------- | ------ | ----- |
| className | 自定义类名   | `string`              | -      | 1.3.0 |
| style     | 自定义样式表 | `React.CSSProperties` | -      | 1.3.0 |
| value     | 值           | `string` \| `number`  | -      | 1.3.0 |
| disabled  | 只读         | `boolean`             | -      | 1.3.0 |
| label     | 选项描述     | `React.ReactNode`     | -      | 1.3.0 |
