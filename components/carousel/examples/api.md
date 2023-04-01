## API

| 属性      | 说明                                 | 类型                                    | 默认值 | 版本 |
| --------- | ------------------------------------ | --------------------------------------- | ------ | ---- |
| className | 自定义类名                           | string                                  | -      | -    |
| style     | 自定义样式表                         | `React.CSSProperties`                   | -      | -    |
| offset    | 查看时的位置                         | number                                  | 0      | -    |
| dots      | 开启指示器                           | boolean                                 | -      | -    |
| autoplay  | 设置自动播放时长, 不设置时不自动播放 | number                                  | -      | -    |
| header    | 自定义头部                           | (offset: `number`) => `React.ReactNode` | -      | -    |
