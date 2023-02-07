import React from 'react';
import { Button, ButtonType } from 'neko-ui';

const Demo = () => {
  const types: ButtonType[] = ['default', 'primary', 'success', 'warning', 'error'];

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {types.map((item) => {
        return (
          <Button key={item} ghost type={item as ButtonType}>
            Ghost
          </Button>
        );
      })}
    </div>
  );
};

export const title = '透明背景';
export default Demo;
