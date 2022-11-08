import { classNames } from '@moneko/common';
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import getPrefixCls from '../get-prefix-cls';
import './color-line.global.less';

type RGB = {
  r: number;
  g: number;
  b: number;
};

export interface ColorLineProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  value?: RGB;
  // eslint-disable-next-line no-unused-vars
  onChange?: (color: RGB) => void;
}
type CanvasMouseEvent = React.MouseEvent<HTMLDivElement>;
type ColorLineInstance = {
  canvas?: HTMLCanvasElement | null;
};

const ColorLine: React.ForwardRefRenderFunction<ColorLineInstance, ColorLineProps> = (
  { className, value = { r: 255, g: 0, b: 255 }, onChange, ...props },
  ref
) => {
  const colorLine = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(value);
  const [drag, setDrag] = useState(false);
  const [width, setWidth] = useState(172);
  const initStrip = useCallback(() => {
    if (!colorLine.current) return;
    const ctx2 = colorLine.current.getContext('2d');

    if (ctx2) {
      ctx2.rect(0, 0, width, colorLine.current.height);
      const grd1 = ctx2.createLinearGradient(0, 0, width, 0);

      grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
      grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
      grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
      grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
      grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
      grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
      grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
      ctx2.fillStyle = grd1;
      ctx2.fill();
    }
  }, [width]);
  const changeColorLine = useCallback(
    ({ offsetX }: { offsetX: number; offsetY: number }) => {
      if (colorLine.current) {
        const ctx2 = colorLine.current?.getContext('2d');
        const maxOffset = width - 10;
        let offset = offsetX - 5;

        if (offset < 0) {
          offset = 0;
        }
        if (offset > maxOffset) {
          offset = maxOffset;
        }
        const x = offsetX >= width ? offsetX : offsetX;

        if (ctx2) {
          const [r, g, b] = ctx2.getImageData(x, 0, 1, 1).data;

          setColor({ r, g, b });
          colorLine.current?.parentElement?.style.setProperty('--offset-x', `${offset}px`);
        }
      }
    },
    [width]
  );
  const onMouseDown = useCallback(
    ({ nativeEvent: { offsetX, offsetY } }: CanvasMouseEvent) => {
      setDrag(true);
      changeColorLine({ offsetX, offsetY });
    },
    [changeColorLine]
  );
  const onMouseMove = useCallback(
    ({ nativeEvent: { offsetX, offsetY } }: CanvasMouseEvent) => {
      if (drag) {
        changeColorLine({ offsetX, offsetY });
      }
    },
    [changeColorLine, drag]
  );
  const onMouseUp = useCallback(() => {
    setDrag(false);
  }, []);

  useEffect(() => {
    initStrip();
  }, [initStrip]);
  useEffect(() => {
    onChange?.(color);
  }, [onChange, color]);

  useImperativeHandle(ref, () => ({
    canvas: colorLine.current,
  }));

  return (
    <div
      {...props}
      ref={(e) => {
        if (e && width !== e.offsetWidth) {
          setWidth(e.offsetWidth);
        }
      }}
      className={classNames(getPrefixCls('line-picker'), className)}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseOut={onMouseUp}
      onMouseMove={onMouseMove}
    >
      <canvas ref={colorLine} width={width} />
    </div>
  );
};

export default React.forwardRef(ColorLine);
