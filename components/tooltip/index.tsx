import React, { useMemo } from 'react';
import { colorParse } from '@moneko/common';
import { cx } from '../emotion';
import Popover, { type PopoverProps } from '../popover';
import prefixCls from '../prefix-cls';

export interface TooltipProps extends Omit<PopoverProps, 'title'> {
  children: React.ReactNode;
  title: React.ReactNode;
  color?: string;
}
const cls = {
  tooltip: prefixCls('tooltip'),
  portal: prefixCls('tooltip-portal'),
};

const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  arrow = true,
  popupStyle,
  className,
  popupClassName,
  color,
  trigger,
  ...props
}) => {
  const _style = useMemo(() => {
    let shadowColor: string | undefined;

    if (color) {
      shadowColor = colorParse(color).setAlpha(0.1).toRgbaString();
    }

    return Object.assign(
      {
        ...popupStyle,
      },
      color && {
        '--popover-bg': color,
        '--popover-shadow-color': shadowColor,
      }
    ) as React.CSSProperties;
  }, [color, popupStyle]);

  return (
    <Popover
      {...props}
      trigger={trigger}
      className={cx(cls.tooltip, className)}
      popupClassName={cx(cls.portal, popupClassName)}
      popupStyle={_style}
      arrow={arrow}
      content={title}
    >
      {children}
    </Popover>
  );
};

export default Tooltip;
