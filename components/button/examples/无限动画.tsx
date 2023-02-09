import { useState } from 'react';
import { Button } from 'neko-ui';

const Demo = () => {
  const [danger, setDanger] = useState(false);

  return (
    <Button
      infinite={danger}
      fill
      type={danger ? 'error' : 'default'}
      onClick={() => {
        setDanger(!danger);
      }}
    >
      Infinite Danger
    </Button>
  );
};

export default Demo;
