import { useState, FC, useEffect, CSSProperties } from 'react';
import { type ExampleModule, myDemoKv } from '@moneko/core';
import { classNames } from '@moneko/common';
import * as pkg from '@pkg/index';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import * as Prism from '@pkg/utils/prism.js';

interface SnapshotGroupProps {
  name: string;
  col?: number;
}

const openCls = 'n-text-white n-bg-primary';
const Snapshot: FC<ExampleModule> = ({ soucre, title }) => {
  const [init, setInit] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <LiveProvider
      code={soucre}
      scope={pkg}
      language="typescript"
      theme={{
        plain: {},
        styles: [],
      }}
    >
      <div className="n-break-inside-avoid n-box-border n-pb-4">
        <div className=" n-transition-border n-rounded n-border-base">
          <h4 className="n-px-4 n-font-medium " style={{ margin: '0.5rem 0' }}>
            {title}
          </h4>
          <div
            className="n-p-4 n-pb-8 n-relative n-transition-border"
            style={{
              borderTop: '1px solid var(--border-color-base, #d9d9d9)',
            }}
          >
            <LiveError />
            <LivePreview />
            <span
              className={classNames(
                'n-w-fit n-cursor-pointer n-p-1 n-rounded-tl n-text-xs n-select-none n-right-0 n-bottom-0 n-absolute n-transition-bg-c',
                open ? openCls : 'n-rounded-br n-bg-primaryDeprecatedBg n-text-primary'
              )}
              onClick={() => {
                if (!init) {
                  setInit(true);
                }
                setOpen(!open);
              }}
            >
              编辑案例代码
            </span>
          </div>
          {init && (
            <LiveEditor
              className={classNames('live-editor n-p-4 n-transition-border', !open && 'n-hidden')}
              style={
                {
                  borderTop: '1px solid var(--border-color-base, #d9d9d9)',
                  '--code-color': 'var(--text-color)',
                } as CSSProperties
              }
              prism={Prism}
            />
          )}
        </div>
      </div>
    </LiveProvider>
  );
};

const SnapshotGroup: FC<SnapshotGroupProps> = ({ name, col = 2 }) => {
  return (
    <div
      className="n-w-full"
      style={{
        columnCount: col,
      }}
    >
      {myDemoKv[name]?.map((m, i) => (
        <Snapshot key={i} soucre={m.soucre} title={m.title} />
      ))}
    </div>
  );
};

export default SnapshotGroup;
