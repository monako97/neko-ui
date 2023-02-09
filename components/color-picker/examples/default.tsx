import { ColorPicker } from 'neko-ui';
import { useState } from 'react';

const Demo = () => {
  const [val, setVal] = useState<string>('rgba(255,0,0,0.5)');

  return (
    <div>
      <ColorPicker value={val} onChange={setVal} />
    </div>
  );
};

export const title = '代码演示';
export default Demo;
