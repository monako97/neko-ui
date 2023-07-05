## API

| 属性              | 说明                                        | 类型                                                                                              | 默认值 | 版本  |
| ----------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------ | ----- |
| class             | 自定义类名                                  | string                                                                                            | -      | 1.6.0 |
| style             | 自定义样式表                                | `CSSProperties`                                                                                   | -      | 1.6.0 |
| open              | 显示                                        | boolean                                                                                           | -      | 1.6.0 |
| destroyInactive   | 关闭后是否销毁                              | boolean                                                                                           | -      | 1.6.0 |
| onOpenChange      | 变更时触发的方法                            | (open: `boolean` \| `null`) => void                                                               | -      | 1.6.0 |
| popupClassName    | 提示层自定义类名                            | string                                                                                            | -      | 1.6.0 |
| popupCss          | 提示层自定义样式                            | `CSSProperties`                                                                                   | -      | 1.6.0 |
| children          | 子元素                                      | `ReactNode`                                                                                       | -      | 1.6.0 |
| content           | 内容                                        | `ReactNode`                                                                                       | -      | 1.6.0 |
| trigger           | 触发行为,可使用数组设置多个触发行为         | `TriggerOption` \| `TriggerOption`[]                                                              | -      | 1.6.0 |
| getPopupContainer | 挂载到指定的元素，值为一个返回对应 DOM 元素 | (node?: `HTMLElement`) => `HTMLElement`                                                           | -      | 1.6.0 |
| disabled          | 不可用状态                                  | `boolean`                                                                                         | -      | 1.6.0 |
| arrow             | 添加一个箭头显示                            | `boolean`                                                                                         | -      | 1.6.0 |
| placement         | 指定弹出显示的方向                          | `bottomLeft` \| `bottom` \| `bottomRight` \| `topLeft` \| `top` \| `topRight` \| `left` \|`right` | -      | 1.6.0 |

## TriggerOption

| 属性        | 说明     |
| ----------- | -------- |
| hover       | 鼠标移入 |
| click       | 点击     |
| contextMenu | 右键     |
| none        | 无       |
