import { Tooltip } from 'neko-ui';
import React from 'react';

const Demo = () => {
  return (
    <Tooltip title="鼠标移入触发" trigger="hover">
      hover
    </Tooltip>
  );
};

export const title = '鼠标移入触发';
export default Demo;
