import React, { type FC, useMemo } from 'react';
import { css } from '@emotion/css';
import { classNames } from '@moneko/common';
import { Avatar, Tooltip, type AvatarProps } from '../index';

export interface AvatarGroupProps {
  data: Omit<AvatarProps, 'size'>[];
  size?: AvatarProps['size'];
  className?: string;
  maxCount?: number;
}
const avatarGroupCss = css`
  display: inline-flex;
  align-items: center;

  & > *:not(:first-child) {
    margin-left: -5%;
  }
`;
const avatarMoreCss = css`
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 4px;
  flex-wrap: wrap;
`;

const AvatarGroup: FC<AvatarGroupProps> = ({
  data = [],
  className,
  size,
  maxCount,
}: AvatarGroupProps) => {
  const showAvatar = useMemo(() => {
    return data.slice(0, maxCount);
  }, [data, maxCount]);
  const more = data.length - (maxCount || data.length);

  return (
    <div className={classNames(avatarGroupCss, className)}>
      {showAvatar.map((a, i) => (
        <Avatar key={`${i}-${a.src}`} size={size} {...a} />
      ))}
      {more ? (
        <Tooltip
          popupStyle={{
            maxWidth: '60vw',
          }}
          title={
            <div className={avatarMoreCss}>
              {data.slice(-more).map((a, i) => (
                <Avatar key={`${i}-${a.src}`} size={size} {...a} />
              ))}
            </div>
          }
        >
          <Avatar size={size} username={`+${more}`} />
        </Tooltip>
      ) : null}
    </div>
  );
};

export default AvatarGroup;
