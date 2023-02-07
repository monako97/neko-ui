import { Tooltip } from 'neko-ui';
import React from 'react';

const Demo = () => {
  return (
    <Tooltip title="click" destroyInactive={false}>
      点击我
    </Tooltip>
  );
};

export const title = '点击触发';
export default Demo;
