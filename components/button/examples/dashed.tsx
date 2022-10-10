import React from 'react';
import { Button, ButtonType } from 'neko-ui';

const Demo = () => {
  const types: ButtonType[] = ['default', 'primary', 'success', 'warning', 'danger', 'error'];

  return (
    <React.Fragment>
      {types.map((item) => {
        return (
          <Button key={item} dashed type={item as ButtonType}>
            Dashed
          </Button>
        );
      })}
    </React.Fragment>
  );
};

export default Demo;
