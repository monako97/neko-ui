import { Avatar } from 'neko-ui';

const Demo = () => {
  return (
    <>
      <div>
        <Avatar size={100} />
        <Avatar size={50} src="https://gw.alipayobjects.com/zos/alicdn/HJtErOC0O/avatar.png" />
        <Avatar size="large" src="https://gw.alipayobjects.com/zos/alicdn/HJtErOC0O/avatar.png" />
        <Avatar size="normal" src="https://gw.alipayobjects.com/zos/alicdn/HJtErOC0O/avatar.png" />
        <Avatar size="small" src="https://gw.alipayobjects.com/zos/alicdn/HJtErOC0O/avatar.png" />
      </div>
    </>
  );
};

export default Demo;
