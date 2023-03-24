import React, { useCallback, useEffect, useState, type CSSProperties, type FC } from 'react';
import { injectGlobal } from '@emotion/css';
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
const colorPickerCss = `
  body .${cls.picker} {
    padding: 10px;
    width: 216px;
  }
  .${cls.trigger} {
    --alpha-gradient: repeating-conic-gradient(#eee 0 25%, transparent 0 50%) 0 / 10px 10px;

    display: inline-block;
    border-radius: var(--border-radius, 8px);
    width: 25px;
    height: 25px;
    background: var(--alpha-gradient);

    &::after {
      display: block;
      border-radius: var(--border-radius, 8px);
      width: 100%;
      height: 100%;
      background: var(--c, #fff);
      opacity: var(--a, 1);
      box-shadow: rgb(0 0 0 / 10%) 0 0 0 1px inset, rgb(0 0 0 / 10%) 0 0 4px inset;
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

export interface ColorPickerProps extends ColorPaletteProps {
  destroyInactive?: boolean;
  popupClassName?: string;
  size?: ComponentSize;
  defaultValue?: string;
}

const ColorPicker: FC<ColorPickerProps> = ({
  destroyInactive = true,
  popupClassName,
  className,
  style,
  size,
  value,
  defaultValue = '#fff',
  onChange,
  ...props
}) => {
  const [val, setVal] = useState<string>(value || defaultValue);
  const handleChange = useCallback((v: string) => {
    setVal(v);
  }, []);

  useEffect(() => {
    return onChange?.(val || defaultValue);
  }, [defaultValue, onChange, val]);
  useEffect(() => {
    injectGlobal([colorPickerCss]);
  }, []);
  return (
    <Tooltip
      {...props}
      title={<ColorPalette value={val} onChange={handleChange} />}
      destroyInactive={destroyInactive}
      popupClassName={classNames(cls.picker, popupClassName)}
      className={classNames(cls.trigger, size && cls[size], className)}
      style={
        {
          ...style,
          '--c': val,
        } as CSSProperties
      }
    >
      {null}
    </Tooltip>
  );
};

export default ColorPicker;
