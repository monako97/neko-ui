## API

| 属性         | 说明                                          | 类型                                                            | 默认值 | 版本  |
| ------------ | --------------------------------------------- | --------------------------------------------------------------- | ------ | ----- |
| class        | 自定义类名                                    | `string`                                                        | -      | 1.5.0 |
| css          | 自定义样式表                                  | string                                                          | -      | 1.5.0 |
| value        | 值(指定值时为受控模式,配合onChange使用)       | `string`                                                        | -      | 1.5.0 |
| defaultValue | 默认值                                        | `string`                                                        | -      | 2.0.0 |
| disabled     | 只读                                          | `boolean`                                                       | -      | 1.5.0 |
| onChange     | 值修改时的回调方法                            | (open: `string`) => void                                        | -      | 1.5.0 |
| items        | 选项数据                                      | `(TabOption\|string)[]`                                         | `[]`   | 1.5.0 |
| fieldNames   | 自定义节点 `label`、`value`、`options` 的字段 | `{label:'label',value:'value',options:'options'}`               | -      | 1.6.0 |
| onEdit       | 删除和添加时的回调方法                        | (type: `add` \| `remove`, item: `TabOption`, e: `Event`)=>void; | -      | 2.0.0 |
| centered     | 标签页居中                                    | `boolean`                                                       | -      | 2.0.0 |
| add          | 显示添加按钮                                  | `boolean`                                                       | -      | 2.0.0 |
| type         | 标签页的显示类型                              | `line` \| `card`                                                | `line` | 2.0.0 |
| extra        | 给标签页左右添加的附加内容                    | `{left?: JSXElement;right?: JSXElement;}`                       | -      | 2.0.0 |

### TabOption

| 属性     | 说明         | 类型         | 默认值 | 版本  |
| -------- | ------------ | ------------ | ------ | ----- |
| class    | 自定义类名   | `string`     | -      | 1.5.0 |
| value    | 值           | `string`     | -      | 1.5.0 |
| disabled | 只读         | `boolean`    | -      | 1.5.0 |
| label    | 选项描述     | `JSXElement` | -      | 1.5.0 |
| icon     | 图标         | `JSXElement` | -      | 1.5.0 |
| suffix   | 后缀         | `JSXElement` | -      | 2.0.0 |
| content  | 内容         | `JSXElement` | -      | 2.0.0 |
| closable | 可关闭的选项 | `boolean`    | -      | 2.0.0 |
