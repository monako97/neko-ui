import React, { FC } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { myDemoKv } from '@moneko/core';
import Sandbox from './sandbox';

const sandboxCss = css`
  .sandbox-group {
    width: 100%;
  }
`;

injectGlobal([sandboxCss]);

interface SandboxGroupProps {
  name: string;
  col?: number;
  ignore?: string[];
}

const SandboxGroup: FC<SandboxGroupProps> = ({ name, col = 2, ignore = [] }) => {
  return (
    <div
      className="sandbox-group"
      style={{
        columnCount: col,
      }}
    >
      {myDemoKv[name]
        ?.filter((e) => (e.title ? !ignore.includes(e.title) : true))
        .map((m, i) => (
          <Sandbox key={i} {...m} />
        ))}
    </div>
  );
};

export default SandboxGroup;
