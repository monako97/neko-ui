## API

| 属性              | 说明                                                    | 类型                                | 默认值              | 版本     |
| ----------------- | ------------------------------------------------------- | ----------------------------------- | ------------------- | -------- |
| className         | 自定义类名                                              | string                              | -                   | -        |
| style             | 自定义样式表                                            | React.CSSProperties                 | -                   | -        |
| target            | 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素 | () => HTMLElement                   | () => window        | -        |
| getPopupContainer | 挂载到指定的元素，值为一个返回对应 DOM 元素             | (node?: HTMLElement) => HTMLElement | () => document.body | `1.0.22` |
| visibilityHeight  | 滚动高度达到此参数值才出现 BackTop                      | number                              | 400                 | -        |
