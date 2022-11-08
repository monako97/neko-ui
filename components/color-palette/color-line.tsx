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
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef<number>(offset);
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
  const changeColorLine = useCallback(() => {
    const ctx2 = colorLine.current?.getContext('2d');

    if (ctx2) {
      const [r, g, b] = ctx2.getImageData(offsetRef.current, 0, 1, 1).data;

      setColor({ r, g, b });
    }
  }, []);
  const onMouseDown = useCallback(
    ({ nativeEvent: { offsetX } }: CanvasMouseEvent) => {
      const _offset = offsetX - 5;

      setDrag(true);
      setOffset(_offset);
      Object.assign(offsetRef, {
        current: _offset,
      });
      changeColorLine();
    },
    [changeColorLine]
  );
  const onMouseMove = useCallback(
    ({ movementX }: MouseEvent) => {
      if (drag) {
        const maxOffset = width - 10;
        let _offset = offsetRef.current + movementX;

        if (_offset < 0) {
          _offset = 0;
        }
        if (_offset > maxOffset) {
          _offset = maxOffset;
        }
        Object.assign(offsetRef, {
          current: _offset,
        });
        changeColorLine();
        setOffset(_offset);
      }
    },
    [changeColorLine, drag, width]
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
  useEffect(() => {
    document.body.addEventListener('mouseup', onMouseUp, false);
    document.body.addEventListener('mousemove', onMouseMove, false);
    return () => {
      document.body.removeEventListener('mouseup', onMouseUp, false);
      document.body.removeEventListener('mousemove', onMouseMove, false);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div
      {...props}
      ref={(e) => {
        if (e && width !== e.offsetWidth) {
          setWidth(e.offsetWidth);
        }
      }}
      style={
        {
          '--offset-x': `${offset}px`,
        } as React.CSSProperties
      }
      className={classNames(getPrefixCls('line-picker'), className)}
      onMouseDown={onMouseDown}
    >
      <canvas ref={colorLine} width={width} />
    </div>
  );
};

export default React.forwardRef(ColorLine);
