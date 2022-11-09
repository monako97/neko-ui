import React from 'react';
import { classNames } from '@moneko/common';
import { ColorPalette, getPrefixCls, Tooltip } from 'neko-ui';
import type { ColorPaletteProps, ComponentSize } from 'neko-ui';
import './index.global.less';

export interface ColorPickerProps extends ColorPaletteProps {
  destroyInactive?: boolean;
  overlayClassName?: string;
  size?: ComponentSize;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  destroyInactive = false,
  overlayClassName,
  className,
  style,
  size,
  value,
  onChange,
}) => {
  return (
    <Tooltip
      title={<ColorPalette value={value} onChange={onChange} />}
      destroyInactive={destroyInactive}
      overlayClassName={classNames(getPrefixCls('color-picker'), overlayClassName)}
      className={classNames(
        getPrefixCls('color-trigger'),
        size && getPrefixCls(`color-${size}`),
        className
      )}
      style={
        {
          ...style,
          '--offset-color': value,
        } as React.CSSProperties
      }
    >
      {null}
    </Tooltip>
  );
};

export default ColorPicker;
