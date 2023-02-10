import { useCallback, useState, FC, useEffect, useRef } from 'react';
import { type ExampleModule, myDemoKv } from '@moneko/core';
import { css } from '@emotion/css';
import { classNames } from '@moneko/common';
import * as pkg from '@pkg/index';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import * as Prism from '@pkg/utils/prism.js';

interface SnapshotGroupProps {
  name: string;
  col?: number;
}

interface SnapshotProps {
  module: ExampleModule;
  style?: string;
}

const codeCss = css`
  .n-md-body,
  pre {
    margin: 0;
  }
`;

const Snapshot: FC<SnapshotProps> = ({ module }) => {
  const el = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <LiveProvider
      code={module.soucre}
      scope={pkg}
      language="typescript"
      theme={{
        plain: {},
        styles: [],
      }}
    >
      <div
        ref={el}
        className="n-break-inside-avoid n-my-6 n-box-border n-transition-snapshot n-rounded n-border-base"
      >
        <h3 className="n-p-[1rem!important] n-m-[0!important]">{module.title}</h3>
        <div className="n-transition-snapshot n-flex n-justify-between n-flex-col n-flex-1 n-p-6 n-pb-0 n-text-right">
          <div className="n-text-left">
            <LiveError />
            <LivePreview />
          </div>
          <div className="n-flex n-items-center n-justify-end n-transition-snapshot">
            <div
              className={classNames(
                'n-w-fit n-bg-[#ddd]/50 n-px-4 n-py-0 n-rounded-t n-select-none n-mt-4 n-ml-2 n-float-right n-cursor-pointer n-text-center n-transition-snapshot hover:n-bg-primaryDeprecatedBg hover:n-text-primary',
                open && 'n-text-primary n-bg-primaryDeprecatedBg'
              )}
              onClick={handleOpen}
            >
              {open ? 'Close' : 'Open'} Editor
            </div>
          </div>
        </div>
        {open && (
          <div className={classNames('n-transition-snapshot n-p-6 n-text-primary', codeCss)}>
            <div className="n-transition-snapshot n-animate-silde-in">
              <LiveEditor prism={Prism} />
            </div>
          </div>
        )}
      </div>
    </LiveProvider>
  );
};

const SnapshotGroup: FC<SnapshotGroupProps> = ({ name, col = 2 }) => {
  return (
    <div
      className="n-w-full n-gap-6"
      style={{
        columnCount: col,
      }}
    >
      {myDemoKv[name]?.map((module, i) => (
        <Snapshot key={i} module={module} />
      ))}
    </div>
  );
};

export default SnapshotGroup;
