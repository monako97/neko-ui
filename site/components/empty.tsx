import React, { FC, memo } from 'react';
import { projectInfo } from '@/utils';
import getBrowser from 'neko-ui/utils/broswer';

const broswer = getBrowser();
const Empty: FC = () => {
  return (
    <div className="n-flex-1 n-max-w-[80rem]  n-box-border n-m-auto n-p-6 n-rounded n-bg-component n-backdrop-blur-lg n-transition-bg">
      <p className="n-flex n-items-end">
        <strong>{projectInfo.title}</strong>
        <span className="n-ml-4">{projectInfo.description}</span>
      </p>
      <p className="n-flex n-items-end">
        <strong>version:</strong>
        <span className="n-ml-4">v{projectInfo.version}</span>
      </p>
      <p className="n-flex n-items-end">
        <strong>author:</strong>
        <span className="n-ml-4">{projectInfo.author?.toString()}</span>
      </p>
      <p className="n-flex n-items-end">
        <strong>Broswer:</strong>
        <span className="n-ml-4">
          {broswer.name} {broswer.version}
        </span>
      </p>
    </div>
  );
};

export default memo(Empty, () => true);
