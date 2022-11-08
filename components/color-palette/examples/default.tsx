import { ColorPalette, Tooltip } from 'neko-ui';
import React, { useState } from 'react';

const Demo = () => {
  const [val, setVal] = useState<string>('rgba(255,0,0,1)');

  return (
    <div>
      <Tooltip
        title={
          <ColorPalette
            onChange={(value) => {
              setVal(value);
            }}
          />
        }
        destroyInactive={false}
        overlayStyle={{ padding: 10 }}
      >
        <input
          type="text"
          disabled
          style={{
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
