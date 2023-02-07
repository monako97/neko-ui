import { CaptureScreen } from 'neko-ui';
import React from 'react';

const Demo = () => {
  return (
    <CaptureScreen
      onStartCapture={(stream) => {
        if (stream) {
          const streamTrack = stream.getVideoTracks()[0];

          // eslint-disable-next-line no-console
          console.log('Track settings:', JSON.stringify(streamTrack.getSettings(), null, 2));
          // eslint-disable-next-line no-console
          console.log('Track constraints:', JSON.stringify(streamTrack?.getConstraints(), null, 2));
        }
      }}
    />
  );
};

export const title = '捕获屏幕';
export default Demo;
