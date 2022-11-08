import { classNames } from '@moneko/common';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AlphaPicker } from '..';
import getPrefixCls from '../get-prefix-cls';
import './index.global.less';

export interface ColorPaletteProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (color: string) => void;
}
type CanvasMouseEvent = React.MouseEvent<HTMLCanvasElement>;

const ColorPalette: React.FC<ColorPaletteProps> = ({
  className,
  value = 'rgba(255,0,0,1)',
  onChange,
}) => {
  const colorPicker = useRef<HTMLCanvasElement>(null);
  const colorStrip = useRef<HTMLCanvasElement>(null);
  const [rgb, setRgb] = useState({
    r: 255,
    g: 0,
    b: 0,
  });
  const [drag, setDrag] = useState(false);
  const [dragColorStrip, setDragColorStrip] = useState(false);
  const [alpha, setAlpha] = useState(1);

  const fillGradient = useCallback((color: string) => {
    if (!colorPicker.current) return;
    const ctx1 = colorPicker.current.getContext('2d');
    const width = colorPicker.current.width;
    const height = colorPicker.current.height;

    if (!ctx1) return;
    ctx1.fillStyle = color;
    ctx1.fillRect(0, 0, width, height);

    if (!colorStrip.current) return;
    const ctx2 = colorStrip.current.getContext('2d');

    if (!ctx2) return;
    const grdWhite = ctx2.createLinearGradient(0, 0, colorStrip.current.width, 0);

    grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
    grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
    ctx1.fillStyle = grdWhite;
    ctx1.fillRect(0, 0, width, height);

    const grdBlack = ctx2.createLinearGradient(0, 0, 0, height);

    grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
    grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
    ctx1.fillStyle = grdBlack;
    ctx1.fillRect(0, 0, width, height);
  }, []);

  const initColorPicker = useCallback(
    (color: string) => {
      if (colorPicker.current) {
        const ctx1 = colorPicker.current.getContext('2d');

        if (ctx1) {
          ctx1.rect(0, 0, colorPicker.current.width || 0, colorPicker.current.height || 0);
          fillGradient(color);
        }
      }
    },
    [fillGradient]
  );
  const initColorStrip = useCallback(() => {
    if (colorStrip.current) {
      const ctx2 = colorStrip.current.getContext('2d');

      if (ctx2) {
        ctx2.rect(0, 0, colorStrip.current.width, colorStrip.current.height);
        const grd1 = ctx2.createLinearGradient(0, 0, colorStrip.current.width, 0);

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
    }
  }, []);
  const changeColorStrip = useCallback(
    ({ offsetX }: { offsetX: number; offsetY: number }) => {
      if (colorStrip.current) {
        const ctx2 = colorStrip.current?.getContext('2d');
        const x = offsetX >= colorStrip.current.width ? offsetX - 1 : offsetX;

        if (ctx2) {
          const [r, g, b] = ctx2.getImageData(x, 0, 1, 1).data;

          setRgb({ r, g, b });
          fillGradient(`rgba(${r},${g},${b},1)`);

          colorStrip.current?.parentElement?.style.setProperty('--offset-x', `${x}px`);
          colorStrip.current?.parentElement?.parentElement?.style.setProperty(
            '--offset-color',
            `rgba(${r},${g},${b},1)`
          );
        }
      }
    },
    [fillGradient]
  );
  const colorStripMouseDown = useCallback(
    ({ nativeEvent: { offsetX, offsetY } }: CanvasMouseEvent) => {
      setDragColorStrip(true);
      changeColorStrip({ offsetX, offsetY });
    },
    [changeColorStrip]
  );
  const colorStripMouseMove = useCallback(
    ({ nativeEvent: { offsetX, offsetY } }: CanvasMouseEvent) => {
      if (dragColorStrip) {
        changeColorStrip({ offsetX, offsetY });
      }
    },
    [changeColorStrip, dragColorStrip]
  );
  const colorStripMouseUp = useCallback(() => {
    setDragColorStrip(false);
  }, []);

  const changeColor = useCallback(({ nativeEvent: { offsetX, offsetY } }: CanvasMouseEvent) => {
    const ctx1 = colorPicker.current?.getContext('2d');

    if (ctx1) {
      const [r, g, b] = ctx1.getImageData(offsetX, offsetY, 1, 1).data;

      colorPicker.current?.parentElement?.style.setProperty('--offset-x', `${offsetX}px`);
      colorPicker.current?.parentElement?.style.setProperty('--offset-y', `${offsetY}px`);

      setRgb({ r, g, b });
    }
  }, []);

  const colorPickerMouseDown = useCallback(
    (e: CanvasMouseEvent) => {
      setDrag(true);
      changeColor(e);
    },
    [changeColor]
  );
  const colorPickerMouseMove = useCallback(
    (e: CanvasMouseEvent) => {
      if (drag) {
        changeColor(e);
      }
    },
    [changeColor, drag]
  );

  const colorPickerMouseUp = useCallback(() => {
    setDrag(false);
  }, []);

  useEffect(() => {
    initColorStrip();
  }, [initColorStrip]);
  useEffect(() => {
    initColorPicker(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    onChange?.(`rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`);
  }, [rgb, alpha, onChange]);

  return (
    <div className={classNames(getPrefixCls('color-palette'), className)}>
      <article
        className={getPrefixCls('color-picker')}
        onMouseDown={colorPickerMouseDown}
        onMouseUp={colorPickerMouseUp}
        onMouseOut={colorPickerMouseUp}
        onMouseMove={colorPickerMouseMove}
      >
        <canvas ref={colorPicker} width={200} />
      </article>
      <article
        className={getPrefixCls('color-strip')}
        onMouseDown={colorStripMouseDown}
        onMouseUp={colorStripMouseUp}
        onMouseOut={colorStripMouseUp}
        onMouseMove={colorStripMouseMove}
      >
        <canvas ref={colorStrip} width={200} />
      </article>
      <AlphaPicker value={alpha} onChange={setAlpha} />
    </div>
  );
};

export default ColorPalette;
