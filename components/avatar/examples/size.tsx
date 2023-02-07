import { Avatar } from 'neko-ui';
import React from 'react';

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

export const title = '自定义尺寸';
export default Demo;
