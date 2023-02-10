import { FC, memo } from 'react';
import { projectInfo } from '@/utils';
import getBrowser from 'neko-ui/utils/broswer';

const broswer = getBrowser();
const Empty: FC = () => {
  return (
    <div className="n-md-body n-min-h-[calc(100vh-14.75rem)]">
      <p>
        <strong>{projectInfo.title}</strong>
        <span className="n-ml-4">{projectInfo.description}</span>
      </p>
      <p>
        <strong>version:</strong>
        <span className="n-ml-4">v{projectInfo.version}</span>
      </p>
      <p>
        <strong>author:</strong>
        <span className="n-ml-4">{projectInfo.author?.toString()}</span>
      </p>
      <p>
        <strong>Broswer:</strong>
        <span className="n-ml-4">
          {broswer.name} {broswer.version}
        </span>
      </p>
    </div>
  );
};

export default memo(Empty, () => true);
