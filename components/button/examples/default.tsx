import React from 'react';
import { Button, ButtonType } from 'neko-ui';

const Demo = () => {
  const types: ButtonType[] = ['default', 'primary', 'success', 'warning', 'error'];

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {types.map((item) => {
        return (
          <Button key={item} type={item as ButtonType}>
            Button
          </Button>
        );
      })}
    </div>
  );
};

export const title = '基本使用';
export default Demo;
