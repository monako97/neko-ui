## API

| 属性         | 说明                                          | 类型                                                                     | 默认值 | 版本  |
| ------------ | --------------------------------------------- | ------------------------------------------------------------------------ | ------ | ----- |
| class        | 自定义类名                                    | string                                                                   | -      | 1.6.0 |
| css          | 自定义样式表                                  | `string`                                                                 | -      | 1.6.0 |
| openKeys     | 菜单展开的keys                                | `string[]`                                                               | -      | 1.6.0 |
| onOpenChange | 菜单展开时触发的方法                          | (keys: `string[]`) => void                                               | -      | 1.6.0 |
| disabled     | 不可用状态                                    | `boolean`                                                                | -      | 1.6.0 |
| value        | 值                                            | `string` \|`number`                                                      | -      | 1.6.0 |
| onChange     | 值修改时的回调方法                            | (val: `(string\|number)\|(string\|number)[]`,item: `MenuOption`) => void | -      | 1.6.0 |
| items        | 选项数据                                      | `(MenuOption\|string)[]`                                                 | `[]`   | 1.6.0 |
| fieldNames   | 自定义节点 `label`、`value`、`options` 的字段 | `{label:'label',value:'value',options:'options'}`                        | -      | 1.6.0 |
| multiple     | 可多选                                        | `boolean`                                                                | -      | 1.7.1 |
| toggle       | 可取消                                        | `boolean`                                                                | -      | 1.7.1 |

### MenuOption

| 属性     | 说明       | 类型                                                        | 默认值 | 版本  |
| -------- | ---------- | ----------------------------------------------------------- | ------ | ----- |
| class    | 自定义类名 | `string`                                                    | -      | 1.6.0 |
| value    | 值         | `string`                                                    | -      | 1.6.0 |
| disabled | 只读       | `boolean`                                                   | -      | 1.6.0 |
| label    | 选项描述   | `JSXElement`                                                | -      | 1.6.0 |
| suffix   | 后缀       | `JSXElement`                                                | -      | 2.0.0 |
| options  | 分组子选项 | `MenuOption[]`                                              | -      | 1.6.0 |
| children | 子选项     | `MenuOption[]`                                              | -      | 1.6.0 |
| icon     | 图标       | `JSXElement`                                                | -      | 2.0.0 |
| type     | 预置类型   | `primary` \| `success` \| `error` \| `warning` \| `default` | -      | 2.0.0 |
| color    | 自定义颜色 | `string`                                                    | -      | 2.0.0 |
