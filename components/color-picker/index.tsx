import React, { type CSSProperties, type FC } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { classNames } from '@moneko/common';
import ColorPalette from '../color-palette';
import Tooltip from '../tooltip';
import type { ColorPaletteProps, ComponentSize } from '../index';

const triggerCss = css`
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: linear-gradient(
      45deg,
      #ccc 25%,
      transparent 25%,
      transparent 75%,
      #ccc 75%,
      #ccc
    ),
    linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc);
  background-size: 10px 10px;
  background-position: 0 0, 5px 5px;
  border-radius: var(--border-radius-base);

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: var(--offset-color, #fff);
    border-radius: var(--border-radius-base);
    opacity: var(--offset-alpha, #fff);
    box-shadow: rgba(0, 0, 0, 0.15) 0 0 0 1px inset, rgba(0, 0, 0, 0.25) 0 0 4px inset;
  }
`;
const sizeCss = {
  small: css`
    width: 15px;
    height: 15px;
  `,
  large: css`
    width: 45px;
    height: 25px;
  `,
  normal: null,
};

injectGlobal(`
body .neko-color-picker {
  padding: 10px;
}
`);
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
        popupClassName={classNames('neko-color-picker', popupClassName)}
        className={classNames(triggerCss, size && sizeCss[size], className)}
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
