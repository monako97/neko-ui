import React, { FC, memo } from 'react';
import { css, injectGlobal } from '@emotion/css';
import getBrowser from 'neko-ui/utils/broswer';
import { projectInfo } from '@/utils';

const siteEmptyCss = css`
  .site-empty {
    min-height: calc(100vh - 14.75rem);
  }

  .site-empty span {
    margin-left: 16px;
  }
`;

injectGlobal([siteEmptyCss]);
const broswer = getBrowser();
const Empty: FC = () => {
  return (
    <div className="n-md-body site-empty">
      <p>
        <strong>{projectInfo.title}</strong>
        <span>{projectInfo.description}</span>
      </p>
      <p>
        <strong>version:</strong>
        <span>v{projectInfo.version}</span>
      </p>
      <p>
        <strong>author:</strong>
        <span>{projectInfo.author?.toString()}</span>
      </p>
      <p>
        <strong>Broswer:</strong>
        <span>
          {broswer.name} {broswer.version}
        </span>
      </p>
    </div>
  );
};

export default memo(Empty, () => true);
