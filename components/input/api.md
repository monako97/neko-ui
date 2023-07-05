## API

| 属性      | 说明                                          | 类型                                                   | 默认值 | 版本  |
| --------- | --------------------------------------------- | ------------------------------------------------------ | ------ | ----- |
| class     | 自定义类名                                    | string                                                 | -      | -     |
| css       | 自定义样式表                                  | `string`                                               | -      | -     |
| label     | 描述                                          | `JSXElement`                                           | -      | 1.1.0 |
| suffix    | 前缀                                          | `JSXElement`                                           | -      | -     |
| prefix    | 后缀                                          | `JSXElement`                                           | -      | -     |
| status    | 状态                                          | `error` \| `success` \| `warning`                      | -      | 1.1.0 |
| size      | 组件尺寸                                      | `small` \| `large`                                     | -      | -     |
| value     | 值                                            | `string` \| `number`                                   | -      | -     |
| onChange  | 值变更时触发的函数                            | (value?: `string` \| `number`) => void                 | -      | -     |
| disabled  | 禁用                                          | `boolean`                                              | -      | -     |
| formatter | 指定输入框展示值的格式                        | (value?: `string` \| `number`) => `string` \| `number` | -      | -     |
| parser    | 搭配 formatter 使用, 将转换后的值转回原来的值 | (value?: `string` \| `number`) => `string` \| `number` | -      | -     |
