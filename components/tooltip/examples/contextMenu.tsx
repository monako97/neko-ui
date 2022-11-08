import { Tooltip } from 'neko-ui';
import React from 'react';

const Demo = () => {
  return (
    <Tooltip title="右键触发" trigger="contextMenu">
      contextMenu
    </Tooltip>
  );
};

export default Demo;
