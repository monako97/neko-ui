import { Tooltip } from 'neko-ui';

const Demo = () => {
  return (
    <Tooltip title="click" destroyInactive={false}>
      点击我
    </Tooltip>
  );
};

export const title = '点击触发';
export default Demo;
