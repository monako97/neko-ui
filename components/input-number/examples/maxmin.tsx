import React, { useState } from 'react';
import { InputNumber } from 'neko-ui';

const Demo = () => {
  const [val, setVal] = useState<number | undefined>(0);

  return <InputNumber min={0} max={100} value={val} onChange={setVal} />;
};

export default Demo;
