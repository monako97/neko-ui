import React, { type FC, useMemo } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { classNames } from '@moneko/common';
import { Avatar, Tooltip, type AvatarProps } from '../index';
import prefixCls from '../prefix-cls';

const cls = {
  group: prefixCls('avatar-group'),
  more: prefixCls('avatar-more'),
};
const avatarGroupCss = css`
  .${cls.group} {
    display: inline-flex;
    align-items: center;

    & > *:not(:first-child) {
      margin-left: -5%;
    }
  }
  .${cls.more} {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    padding: 8px;
    max-width: 60vw;
    max-height: 80vh;
    gap: 16px;
    flex-wrap: wrap;
  }
`;

injectGlobal([avatarGroupCss]);

export interface AvatarGroupProps {
  data: Omit<AvatarProps, 'size'>[];
  size?: AvatarProps['size'];
  className?: string;
  maxCount?: number;
}

const AvatarGroup: FC<AvatarGroupProps> = (props: AvatarGroupProps) => {
  const showAvatar = useMemo(
    () => props.data.slice(0, props.maxCount),
    [props.data, props.maxCount]
  );
  const more = useMemo(
    () => props.data.length - (props.maxCount || props.data.length),
    [props.data.length, props.maxCount]
  );

  return (
    <div className={classNames(cls.group, props.className)}>
      {showAvatar.map((a, i) => (
        <Avatar key={`${i}-${a.src}`} size={props.size} {...a} />
      ))}
      {more > 0 ? (
        <Tooltip
          title={
            <div className={cls.more}>
              {props.data.slice(-more).map((a, i) => (
                <Avatar key={`${i}-${a.src}`} size={props.size} {...a} />
              ))}
            </div>
          }
        >
          <Avatar size={props.size} username={`+${more}`} />
        </Tooltip>
      ) : null}
    </div>
  );
};

export default AvatarGroup;
