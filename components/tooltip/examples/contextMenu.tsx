import { Tooltip } from 'neko-ui';

const Demo = () => {
  return (
    <Tooltip title="右键触发" trigger="contextMenu">
      contextMenu
    </Tooltip>
  );
};

export const title = '右键触发';
export default Demo;
