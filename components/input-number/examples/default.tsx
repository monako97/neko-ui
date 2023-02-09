import { useState } from 'react';
import { InputNumber } from 'neko-ui';

const Demo = () => {
  const [val, setVal] = useState<number | undefined>(0);

  return <InputNumber value={val} onChange={setVal} />;
};

export const title = '简单使用';
export default Demo;
