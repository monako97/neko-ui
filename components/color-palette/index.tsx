import { classNames } from '@moneko/common';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AlphaPicker from './alpha-picker';
import getPrefixCls from '../get-prefix-cls';
import ColorLine from './color-line';
import './index.global.less';
import tinycolor from 'tinycolor2';
import { Input } from '..';

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
  const colorStrip = useRef<{ canvas: HTMLCanvasElement }>(null);
  const [rgb, setRgb] = useState({
    r: 255,
    g: 0,
    b: 0,
  });
  const [drag, setDrag] = useState(false);
  const [alpha, setAlpha] = useState(1);
  const [colorValue, setColorValue] = useState({
    r: 255,
    g: 0,
    b: 0,
  });

  const fillGradient = useCallback((color: string) => {
    if (!colorPicker.current) return;
    const ctx1 = colorPicker.current.getContext('2d');
    const width = colorPicker.current.width;
    const height = colorPicker.current.height;

    if (!ctx1) return;
    ctx1.fillStyle = color;
    ctx1.fillRect(0, 0, width, height);
    if (!colorStrip.current?.canvas) return;
    const ctx2 = colorStrip.current.canvas.getContext('2d');

    if (!ctx2) return;
    const grdWhite = ctx2.createLinearGradient(0, 0, colorStrip.current.canvas.width, 0);

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
    initColorPicker(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const { r, g, b } = colorValue;

    fillGradient(`rgba(${r},${g},${b},1)`);
    setRgb({ r, g, b });
  }, [colorValue, fillGradient]);
  useEffect(() => {
    colorPicker.current?.parentElement?.parentElement?.style.setProperty(
      '--offset-color',
      `rgb(${rgb.r},${rgb.g},${rgb.b})`
    );
    colorPicker.current?.parentElement?.parentElement?.style.setProperty(
      '--offset-alpha',
      alpha as unknown as string
    );
    onChange?.(`rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`);
  }, [rgb, alpha, onChange]);
  const hex = useMemo(
    () => tinycolor(`rgb(${rgb.r},${rgb.g},${rgb.b})`).toHex(),
    [rgb.b, rgb.g, rgb.r]
  );

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
      <div className={getPrefixCls('color-setting')}>
        <div className={getPrefixCls('color-strip')}>
          <ColorLine ref={colorStrip} value={colorValue} onChange={setColorValue} />
          <AlphaPicker value={alpha} onChange={setAlpha} />
        </div>
        <div className={getPrefixCls('color-preview')} />
      </div>
      <div className={getPrefixCls('color-form')}>
        <div className={getPrefixCls('color-input')}>
          <Input name="hex" size="small" value={hex} />
          <label htmlFor="hex">Hex</label>
        </div>
        <div className={getPrefixCls('color-input')}>
          <Input name="r" size="small" value={rgb.r} />
          <label htmlFor="r">R</label>
        </div>
        <div className={getPrefixCls('color-input')}>
          <Input name="g" size="small" value={rgb.g} />
          <label htmlFor="g">G</label>
        </div>
        <div className={getPrefixCls('color-input')}>
          <Input name="b" size="small" value={rgb.b} />
          <label htmlFor="b">B</label>
        </div>
        <div className={getPrefixCls('color-input')}>
          <Input name="a" size="small" value={parseInt((alpha * 100).toFixed(2))} />
          <label htmlFor="a">A</label>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
