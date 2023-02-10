import React, {
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { classNames } from '@moneko/common';
import { Input, InputNumber } from '../index';
import AlphaSlider from './alpha-slider';
import HueSlider from './hue-slider';
import tinycolor from 'tinycolor2';
import {
  formCss,
  inputCss,
  paletteCss,
  previewCss,
  settingCss,
  stripCss,
  svpanelCss,
} from './style';

export interface ColorPaletteProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (color: string) => void;
}
type CanvasMouseEvent = ReactMouseEvent<HTMLCanvasElement>;

const ColorPalette: FC<ColorPaletteProps> = ({
  className,
  value = 'rgba(255,0,0,1)',
  onChange,
  ...props
}) => {
  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLCanvasElement>(null);
  const hueSlider = useRef<{ canvas: HTMLCanvasElement }>(null);
  const [rgb, setRgb] = useState({
    r: 255,
    g: 0,
    b: 0,
  });
  const [svPanelRect, setSvPanelRect] = useState({
    width: 200,
    height: 150,
  });
  const [drag, setDrag] = useState(false);
  const [alpha, setAlpha] = useState(tinycolor(value).getAlpha());
  const [hue, setHue] = useState({
    r: 255,
    g: 0,
    b: 0,
  });
  const fillGradient = useCallback(
    (color: string) => {
      if (colorPickerRef.current) {
        const ctx1 = colorPickerRef.current.getContext('2d');

        if (ctx1) {
          ctx1.fillStyle = color;
          ctx1.fillRect(0, 0, svPanelRect.width, svPanelRect.height);
          if (hueSlider.current?.canvas) {
            const ctx2 = hueSlider.current.canvas.getContext('2d');

            if (ctx2) {
              const grdWhite = ctx2.createLinearGradient(0, 0, hueSlider.current.canvas.width, 0);

              grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
              grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
              ctx1.fillStyle = grdWhite;
              ctx1.fillRect(0, 0, svPanelRect.width, svPanelRect.height);

              const grdBlack = ctx2.createLinearGradient(0, 0, 0, svPanelRect.height);

              grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
              grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
              ctx1.fillStyle = grdBlack;
              ctx1.fillRect(0, 0, svPanelRect.width, svPanelRect.height);
            }
          }
        }
      }
    },
    [svPanelRect.height, svPanelRect.width]
  );
  const initColorPicker = useCallback(
    (color: string) => {
      const ctx1 = colorPickerRef.current?.getContext('2d');

      if (ctx1) {
        ctx1.rect(0, 0, svPanelRect.width, svPanelRect.height);
        fillGradient(color);
      }
    },
    [fillGradient, svPanelRect.height, svPanelRect.width]
  );
  const changeColor = useCallback(
    ({ nativeEvent: { offsetX, offsetY } }: CanvasMouseEvent) => {
      const ctx1 = colorPickerRef.current?.getContext('2d');

      if (ctx1) {
        let x = offsetX;

        if (offsetX >= svPanelRect.width) {
          x = offsetX - 1;
        }
        if (x < 0) {
          x = 0;
        }
        const rgbData = ctx1.getImageData(x, offsetY, 1, 1).data;

        colorPickerRef.current?.parentElement?.style.setProperty('--offset-x', `${offsetX}px`);
        colorPickerRef.current?.parentElement?.style.setProperty('--offset-y', `${offsetY}px`);
        setRgb({ r: rgbData[0], g: rgbData[1], b: rgbData[2] });
      }
    },
    [svPanelRect.width]
  );
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
    const { r, g, b } = hue;

    fillGradient(`rgba(${r},${g},${b},1)`);
    setRgb({ r, g, b });
  }, [hue, fillGradient]);

  useEffect(() => {
    colorPaletteRef.current?.style.setProperty('--offset-color', `rgb(${rgb.r},${rgb.g},${rgb.b})`);
    colorPaletteRef.current?.style.setProperty('--offset-alpha', alpha as unknown as string);
    onChange?.(`rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`);
  }, [rgb, alpha, onChange]);
  const hex = useMemo(() => tinycolor(value).toHex(), [value]);

  return (
    <div {...props} ref={colorPaletteRef} className={classNames(paletteCss, className)}>
      <article
        className={svpanelCss}
        onMouseDown={colorPickerMouseDown}
        onMouseUp={colorPickerMouseUp}
        onMouseOut={colorPickerMouseUp}
        onMouseMove={colorPickerMouseMove}
        ref={(e) => {
          if (e && svPanelRect.width !== e.offsetWidth && svPanelRect.height !== e.offsetHeight) {
            setSvPanelRect({
              width: e.offsetWidth,
              height: e.offsetHeight,
            });
          }
        }}
      >
        <canvas ref={colorPickerRef} width={svPanelRect.width} height={svPanelRect.height} />
      </article>
      <div className={settingCss}>
        <div className={stripCss}>
          <HueSlider ref={hueSlider} value={hue} onChange={setHue} />
          <AlphaSlider value={alpha} onChange={setAlpha} />
        </div>
        <div className={previewCss} />
      </div>
      <div className={formCss}>
        <div className={inputCss}>
          <Input
            name="hex"
            size="small"
            formatter={(v) => `#${v}`}
            parser={(v) => v?.toString().replace(/#/, '')}
            value={hex}
            onChange={(v) => {
              if (v) {
                const { r, g, b } = tinycolor(v as string).toRgb();

                setRgb({ r, g, b });
              }
            }}
          />
          <label htmlFor="hex">Hex</label>
        </div>
        <div className={inputCss}>
          <InputNumber
            name="r"
            size="small"
            min={0}
            max={255}
            value={rgb.r}
            onChange={(v) => {
              setRgb({ ...rgb, r: v as number });
            }}
          />
          <label htmlFor="r">R</label>
        </div>
        <div className={inputCss}>
          <InputNumber
            name="g"
            size="small"
            min={0}
            max={255}
            value={rgb.g}
            onChange={(v) => {
              setRgb({ ...rgb, g: v as number });
            }}
          />
          <label htmlFor="g">G</label>
        </div>
        <div className={inputCss}>
          <InputNumber
            name="b"
            size="small"
            min={0}
            max={255}
            value={rgb.b}
            onChange={(v) => {
              setRgb({ ...rgb, b: v as number });
            }}
          />
          <label htmlFor="b">B</label>
        </div>
        <div className={inputCss}>
          <InputNumber
            name="a"
            size="small"
            value={alpha}
            formatter={(v) => {
              const val = ((v as number) * 100).toFixed();

              return v ? parseInt(val) : v;
            }}
            parser={(v) => {
              let _val = v;

              if (typeof v === 'string') {
                _val = v.replace(/[^\d]/g, '');
              }

              return (_val as number) / 100;
            }}
            step={0.01}
            min={0}
            max={1}
            onChange={(v) => {
              if (typeof v === 'number') {
                setAlpha(v);
              }
            }}
          />
          <label htmlFor="a">A</label>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
