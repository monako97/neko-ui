import React, { useMemo } from 'react';
import { cls } from './style';
import Avatar, { type AvatarProps } from '../avatar';
import { cx } from '../emotion';
import Popover from '../popover';

export interface AvatarGroupProps {
  data: Omit<AvatarProps, 'size'>[];
  size?: AvatarProps['size'];
  className?: string;
  maxCount?: number;
}

const AvatarGroup: React.FC<AvatarGroupProps> = (props: AvatarGroupProps) => {
  const showAvatar = useMemo(
    () => props.data.slice(0, props.maxCount),
    [props.data, props.maxCount]
  );
  const more = useMemo(
    () => props.data.length - (props.maxCount || props.data.length),
    [props.data.length, props.maxCount]
  );

  return (
    <div className={cx(cls.group, props.className)}>
      {showAvatar.map((a, i) => (
        <Avatar key={`${i}-${a.src}`} size={props.size} {...a} />
      ))}
      {more > 0 ? (
        <Popover
          arrow
          trigger="click"
          content={
            <div className={cls.more}>
              {props.data.slice(-more).map((a, i) => (
                <Avatar key={`${i}-${a.src}`} size={props.size} {...a} />
              ))}
            </div>
          }
        >
          <Avatar size={props.size} username={`+${more}`} />
        </Popover>
      ) : null}
    </div>
  );
};

export default AvatarGroup;
