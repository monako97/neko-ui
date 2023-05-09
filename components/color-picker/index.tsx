import React, { useCallback, useEffect, useState } from 'react';
import { cls } from './style';
import { cx } from '../emotion';
import { ColorPalette, type ColorPaletteProps, type ComponentSize } from '../index';
import Popover from '../popover';

export interface ColorPickerProps extends ColorPaletteProps {
  destroyInactive?: boolean;
  popupClassName?: string;
  size?: ComponentSize;
  defaultValue?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
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

  return (
    <Popover
      {...props}
      arrow
      trigger="click"
      content={<ColorPalette value={val} onChange={handleChange} />}
      destroyInactive={destroyInactive}
      popupClassName={cx(cls.picker, popupClassName)}
      className={cx(cls.trigger, size && cls[size], className)}
      style={
        {
          ...style,
          '--c': val,
        } as React.CSSProperties
      }
    >
      {null}
    </Popover>
  );
};

export default ColorPicker;
