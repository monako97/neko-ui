## API

| 属性       | 说明                                          | 类型                                              | 默认值       | 版本  |
| ---------- | --------------------------------------------- | ------------------------------------------------- | ------------ | ----- |
| className  | 自定义类名                                    | `string`                                          | -            | 1.4.0 |
| style      | 自定义样式表                                  | `React.CSSProperties`                             | -            | 1.4.0 |
| name       | `input[type="checkbox"]` 的 name 属性         | `string`                                          | -            | 1.4.0 |
| value      | 值                                            | `Array<string>`                                   | -            | 1.4.0 |
| disabled   | 只读                                          | `boolean`                                         | -            | 1.4.0 |
| onChange   | 值修改时的回调方法                            | (val: `Array<string>`) => void                    | -            | 1.4.0 |
| options    | 选项数据                                      | `(CheckboxOption\|string)[]`                      | `[]`         | 1.4.0 |
| layout     | 选项排列方式                                  | `vertical` \| `horizontal`                        | `horizontal` | 1.4.0 |
| fieldNames | 自定义节点 `label`、`value`、`options` 的字段 | `{label:'label',value:'value',options:'options'}` | -            | 1.6.0 |

### CheckboxOption

| 属性          | 说明         | 类型                  | 默认值 | 版本  |
| ------------- | ------------ | --------------------- | ------ | ----- |
| className     | 自定义类名   | `string`              | -      | 1.4.0 |
| style         | 自定义样式表 | `React.CSSProperties` | -      | 1.4.0 |
| value         | 值           | `string`              | -      | 1.4.0 |
| disabled      | 只读         | `boolean`             | -      | 1.4.0 |
| label         | 选项描述     | `React.ReactNode`     | -      | 1.4.0 |
| indeterminate | 不确定状态   | `boolean`             | -      | 1.4.2 |
