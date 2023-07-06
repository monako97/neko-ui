## API

| 属性                    | 说明                   | 类型                                           | 默认值        | 版本 |
| ----------------------- | ---------------------- | ---------------------------------------------- | ------------- | ---- |
| class                   | 自定义类名             | string                                         | -             | -    |
| options                 | MediaStreamConstraints | `MediaStreamConstraints`                       | {video: true} | -    |
| preview                 | 是否预览               | boolean                                        | -             | -    |
| controls                | 预览时是否显示控制器   | boolean                                        | -             | -    |
| recorder                | 录制时配置项           | boolean                                        | -             | -    |
| filename                | 录制文件名称           | string                                         | -             | -    |
| captureScreenText       | 捕获屏幕按钮文字       | string                                         | -             | -    |
| stopCaptureText         | 停止捕获按钮文字       | string                                         | -             | -    |
| startRecorderText       | 开始录制按钮文字       | string                                         | -             | -    |
| stopRecorderText        | 停止录制按钮文字       | string                                         | -             | -    |
| pausedRecorderText      | 暂停录制按钮文字       | string                                         | -             | -    |
| recorderingText         | 录制中按钮文字         | string                                         | -             | -    |
| onRecorderError         | 录制错误回调           | `MediaRecorder.onerror`                        | -             | -    |
| onStartRecorder         | 开始录制回调           | (state: `MediaRecorder.state`) => void         | -             | -    |
| onStopRecorder          | 停止录制回调           | () => void                                     | -             | -    |
| onStopCapture           | 停止捕获屏幕回调       | () => void                                     | -             | -    |
| onStartCapture          | 开始捕获屏幕回调       | (stream?: `MediaStream`) => void               | -             | -    |
| onRecorderDataAvailable | 每次记录媒体时触发     | (e: `MediaRecorderDataAvailableEvent`) => void | -             | -    |
| onSaveRecorder          | 自定义保存录制文件方法 | (blob: `Blob`, fileName: `string`) => void     | -             | -    |
