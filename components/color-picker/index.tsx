import React, { type CSSProperties, type FC } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { classNames } from '@moneko/common';
import { ColorPalette, Tooltip, type ColorPaletteProps, type ComponentSize } from '../index';
import prefixCls from '../prefix-cls';

const cls = {
  picker: prefixCls('color-picker'),
  trigger: prefixCls('color-picker-trigger'),
  small: prefixCls('color-picker-small'),
  large: prefixCls('color-picker-large'),
  normal: prefixCls('color-picker-normal'),
};
const colorPickerCss = css`
  body .${cls.picker} {
    padding: 10px;
  }
  .${cls.trigger} {
    display: inline-block;
    border-radius: var(--border-radius, 8px);
    width: 25px;
    height: 25px;
    background-position: 0 0, 5px 5px;
    background-size: 10px 10px;
    background-image: linear-gradient(
        45deg,
        #ccc 25%,
        transparent 25%,
        transparent 75%,
        #ccc 75%,
        #ccc
      ),
      linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc);

    &::after {
      display: block;
      border-radius: var(--border-radius, 8px);
      width: 100%;
      height: 100%;
      background: var(--offset-color, #fff);
      opacity: var(--offset-alpha, #fff);
      box-shadow: rgb(0 0 0 / 15%) 0 0 0 1px inset, rgb(0 0 0 / 25%) 0 0 4px inset;
      content: '';
    }
  }
  .${cls.large} {
    width: 45px;
    height: 25px;
  }
  .${cls.small} {
    width: 15px;
    height: 15px;
  }
  .${cls.normal} {
    width: 25px;
    height: 25px;
  }
`;

injectGlobal([colorPickerCss]);

export interface ColorPickerProps extends ColorPaletteProps {
  destroyInactive?: boolean;
  popupClassName?: string;
  size?: ComponentSize;
}

const ColorPicker: FC<ColorPickerProps> = ({
  destroyInactive = false,
  popupClassName,
  className,
  style,
  size,
  value,
  onChange,
  ...props
}) => {
  return (
    <>
      <Tooltip
        {...props}
        title={<ColorPalette value={value} onChange={onChange} />}
        destroyInactive={destroyInactive}
        popupClassName={classNames(cls.picker, popupClassName)}
        className={classNames(cls.trigger, size && cls[size], className)}
        style={
          {
            ...style,
            '--offset-color': value,
          } as CSSProperties
        }
      >
        {null}
      </Tooltip>
    </>
  );
};

export default ColorPicker;
