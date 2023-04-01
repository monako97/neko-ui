## API

| 属性           | 说明                                           | 类型                                    | 默认值 | 版本 |
| -------------- | ---------------------------------------------- | --------------------------------------- | ------ | ---- |
| className      | 自定义类名                                     | string                                  | -      | -    |
| style          | 自定义样式表                                   | `React.CSSProperties`                   | -      | -    |
| data           | 图片数据                                       | `ImageData`[]                           | -      | -    |
| offset         | 查看图片时的位置                               | number                                  | 0      | -    |
| open           | 设置 open 来控制弹窗开启关闭, 不设置值则为轮播 | boolean                                 | -      | -    |
| dots           | 开启指示器                                     | boolean                                 | -      | -    |
| autoplay       | 设置自动播放时长, 不设置时不自动播放           | number                                  | -      | -    |
| onOpenChange   | 弹窗开启关闭时触发                             | (open: `boolean`) => void               | -      |
| onOffsetChange | 切换图片时触发                                 | (offset: `number`) => void              | -      | -    |
| header         | 自定义头部                                     | (offset: `number`) => `React.ReactNode` | -      | -    |

### ImageData

| 属性 | 说明          | 类型                |
| ---- | ------------- | ------------------- |
| src  | 图片地址      | `string`            |
| alt  | 图片 alt 属性 | `string`            |
| key  | key           | `string` \|`number` |
