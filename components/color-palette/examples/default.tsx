import { ColorPalette, Tooltip } from 'neko-ui';
import React, { useState } from 'react';

const Demo = () => {
  const [val, setVal] = useState<string>('rgba(255,0,0,0.5)');

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Tooltip
        title={<ColorPalette value={val} onChange={setVal} />}
        destroyInactive={false}
        overlayStyle={{ padding: 10 }}
      >
        <div
          style={{
            width: 64,
            height: 32,
            padding: 8,
            backgroundColor: val,
            marginBottom: 8,
            borderRadius: 4,
            border: 'none',
            textAlign: 'center',
          }}
        />
      </Tooltip>
    </div>
  );
};

export default Demo;
