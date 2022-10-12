import React from 'react';
import { Marquee } from 'neko-ui';

const Demo = () => {
  return (
    <React.Fragment>
      <Marquee>
        <pre style={{ display: 'inline-block' }}>
          <code>csasc</code>
        </pre>
      </Marquee>
      <Marquee>
        csasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasccsasc
      </Marquee>
    </React.Fragment>
  );
};

export default Demo;
