## API

| 属性             | 说明                                               | 类型                                                                                            | 默认值  | 版本 |
| ---------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------- | ---- |
| className        | 自定义类名                                         | `string`                                                                                        | -       | -    |
| style            | 自定义样式表                                       | `React.CSSProperties`                                                                           | -       | -    |
| multiple         | 多选模式                                           | `boolean`                                                                                       | `false` | -    |
| readonly         | 只读                                               | `boolean`                                                                                       | -       | -    |
| toggle           | 开启取消选中, 仅多选模式生效                       | `boolean`                                                                                       | -       | -    |
| data             | 数据源                                             | `TreeData[]` \| `string`                                                                        | -       | -    |
| fromSchema       | 开启此选项支持 `JSON Schema`                       | `boolean`                                                                                       | `false` | -    |
| direction        | 方向                                               | `ltr` \| `rtl`                                                                                  | `ltr`   | -    |
| value            | 选中的值, 多选模式时为数组                         | `string[]` \| `string`                                                                          | -       | -    |
| onChange         | 选中的值发生修改时的回调函数, 多选模式时入参为数组 | (key: `string[]`\| `string`): void                                                              | -       | -    |
| onRowClick       | 点击行时的回调函数                                 | (e: `ReactMouseEvent`, key: `string`, item: `TreeData`): void                                   | -       | -    |
| onRowDoubleClick | 双击行时的回调函数                                 | (e: `ReactMouseEvent`, key: `string`, item: `TreeData`): void                                   | -       | -    |
| renderRow        | 自定义渲染行                                       | (item: `TreeData`, title: `React.ReactNode`, subTitle?: `React.ReactNode`): `React.ReactNode[]` | -       | -    |
