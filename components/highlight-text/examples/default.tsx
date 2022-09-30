import React from 'react';
import { HighlightText } from 'neko-ui';

const str = `买入价格是指自己岛上的的价格，在其他岛上购买大头菜不会影响此数值`;

const Demo = () => {
  return <HighlightText text={str} highlight={'大头菜'} />;
};

export default Demo;
