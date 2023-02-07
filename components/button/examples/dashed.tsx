import React from 'react';
import { Button, ButtonType } from 'neko-ui';

const Demo = () => {
  const types: ButtonType[] = ['default', 'primary', 'success', 'warning', 'error'];

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {types.map((item) => {
        return (
          <Button key={item} dashed ghost type={item as ButtonType}>
            Dashed
          </Button>
        );
      })}
    </div>
  );
};

export const title = '虚线按钮';
export default Demo;
