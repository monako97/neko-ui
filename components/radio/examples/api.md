## API

| 属性       | 说明                                          | 类型                                              | 默认值       | 版本  |
| ---------- | --------------------------------------------- | ------------------------------------------------- | ------------ | ----- |
| class      | 自定义类名                                    | `string`                                          | -            | 1.3.0 |
| css        | 自定义样式表                                  | `string`                                          | -            | 1.3.0 |
| name       | `input[type="radio"]` 的 name 属性            | `string`                                          | -            | 1.3.0 |
| value      | 值                                            | `string`                                          | -            | 1.3.0 |
| disabled   | 只读                                          | `boolean`                                         | -            | 1.3.0 |
| onChange   | 值修改时的回调方法                            | (open: `string`) => void                          | -            | 1.3.0 |
| options    | 选项数据                                      | `(RadioOption\|string)[]`                         | `[]`         | 1.3.0 |
| layout     | 选项排列方式                                  | `vertical` \| `horizontal`                        | `horizontal` | 1.3.0 |
| fieldNames | 自定义节点 `label`、`value`、`options` 的字段 | `{label:'label',value:'value',options:'options'}` | -            | 1.6.0 |

### RadioOption

| 属性     | 说明       | 类型                                          | 默认值 | 版本  |
| -------- | ---------- | --------------------------------------------- | ------ | ----- |
| class    | 自定义类名 | `string`                                      | -      | 2.0.0 |
| value    | 值         | `string`                                      | -      | 2.0.0 |
| disabled | 只读       | `boolean`                                     | -      | 2.0.0 |
| label    | 选项描述   | `string`                                      | -      | 2.0.0 |
| status   | 选项状态   | `success` \| `warning` \| `error` \| `normal` | -      | 2.0.0 |
