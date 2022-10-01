import React from 'react';
import { CaptureScreen } from 'neko-ui';

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

export default Demo;
