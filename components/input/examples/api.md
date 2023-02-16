## API

| 属性      | 说明                                          | 类型                                         | 默认值 | 版本 |
| --------- | --------------------------------------------- | -------------------------------------------- | ------ | ---- |
| className | 自定义类名                                    | string                                       | -      | -    |
| style     | 自定义样式表                                  | React.CSSProperties                          | -      | -    |
| suffix    | 前缀                                          | React.ReactNode                              | -      | -    |
| prefix    | 后缀                                          | React.ReactNode                              | -      | -    |
| size      | 组件尺寸                                      | small、 large                                | -      | -    |
| value     | 值                                            | string、 number                              | -      | -    |
| onChange  | 值变更时触发的函数                            | (value?: string、 number) => void            | -      | -    |
| formatter | 指定输入框展示值的格式                        | (value?: string、 number) => string、 number | -      | -    |
| parser    | 搭配 formatter 使用, 将转换后的值转回原来的值 | (value?: string、 number) => string、number  | -      | -    |
