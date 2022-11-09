import React, { useState } from 'react';
import { InputNumber } from 'neko-ui';

const Demo = () => {
  const [val, setVal] = useState<number | undefined>(0);

  return (
    <InputNumber
      min={0}
      max={1}
      step={0.01}
      formatter={(v) => `${((v as number) || 0) * 100}%`}
      parser={(v) => parseFloat(v?.toString().replace(/%$/, '') || '0') / 100}
      value={val}
      onChange={setVal}
      suffix={val}
    />
  );
};

export default Demo;
