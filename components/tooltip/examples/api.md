## API

| 属性              | 说明                                        | 类型                                    | 默认值              | 版本 |
| ----------------- | ------------------------------------------- | --------------------------------------- | ------------------- | ---- |
| className         | 自定义类名                                  | string                                  | -                   | -    |
| style             | 自定义样式表                                | `React.CSSProperties`                   | -                   | -    |
| open              | 显示                                        | boolean                                 | -                   | -    |
| destroyInactive   | 关闭后是否销毁 Tooltip                      | boolean                                 | -                   | -    |
| onOpenChange      | 变更时触发的方法                            | (open: `boolean`) => void               | -                   | -    |
| popupClassName    | 提示层自定义类名                            | string                                  | -                   | -    |
| color             | 提示层背景颜色                              | string                                  | -                   | -    |
| shadowColor       | 提示层背景阴影颜色                          | string                                  | -                   | -    |
| popupStyle        | 提示层自定义样式                            | `React.CSSProperties`                   | -                   | -    |
| children          | 子元素                                      | `React.ReactNode`                       | -                   | -    |
| title             | 提示内容                                    | `React.ReactNode`                       | -                   | -    |
| trigger           | 触发行为,可使用数组设置多个触发行为         | `TriggerOption` \| `TriggerOption`[]    | -                   | -    |
| getPopupContainer | 挂载到指定的元素，值为一个返回对应 DOM 元素 | (node?: `HTMLElement`) => `HTMLElement` | () => document.body | -    |

## TriggerOption

| 属性        | 说明     |
| ----------- | -------- |
| hover       | 鼠标移入 |
| click       | 点击     |
| contextMenu | 右键     |
