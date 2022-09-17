import React, { memo, useMemo } from 'react';
import styles from './index.less';
import isEqual from 'lodash/isEqual';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Tag: React.FC<TagProps> = ({ className, ...props }) => {
  const cls = useMemo(() => [styles.tag, className].filter(Boolean).join(' '), [className]);

  return <div {...props} className={cls} />;
};

export default memo(Tag, isEqual);
