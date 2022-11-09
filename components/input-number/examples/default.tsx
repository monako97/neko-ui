import React, { useState } from 'react';
import { InputNumber } from 'neko-ui';

const Demo = () => {
  const [val, setVal] = useState<number | undefined>(0);

  return <InputNumber value={val} onChange={setVal} />;
};

export default Demo;
