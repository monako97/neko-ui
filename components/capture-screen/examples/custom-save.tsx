import { CaptureScreen } from 'neko-ui';

const Demo = () => {
  return (
    <CaptureScreen
      recorder
      onSaveRecorder={(blob, fileName) => {
        // eslint-disable-next-line no-console
        console.log('停止录制', fileName, 'size:', (blob.size / 1048576).toFixed(2) + 'mb');
        const URL = window.URL || window.webkitURL,
          objectUrl = URL.createObjectURL(blob),
          a = document.createElement('a');

        a.href = objectUrl;
        a.download = `自定义保存录制视频方法-${fileName}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(objectUrl);
      }}
    />
  );
};

export const title = '自定义保存录制视频方法';
export default Demo;
