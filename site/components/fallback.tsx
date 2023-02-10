import { memo } from 'react';
import { Skeleton } from 'neko-ui';

const Fallback = () => {
  return (
    <div className="n-flex n-flex-1 n-max-w-[80rem] n-m-auto n-bg-component n-p-6 n-rounded">
      <Skeleton count={6} />
    </div>
  );
};

export default memo(Fallback, () => true);
