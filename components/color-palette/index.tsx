import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  type CSSProperties,
  type Dispatch,
  type FC,
  type HTMLAttributes,
  type MouseEventHandler,
  type SetStateAction,
} from 'react';
import { css, injectGlobal } from '@emotion/css';
import { classNames, passiveSupported, setClipboard } from '@moneko/common';
import { parseToHSVA } from './color';
import { genHSVA, HSVAVoidName } from './gen-hsva';
import { Button, Input, InputNumber } from '../index';
import prefixCls from '../prefix-cls';

const colors = [
  '#f44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFC107',
  '#FF9800',
  'rgba(0,0,0,.65)',
  'transparent',
];

export const cls = {
  palette: prefixCls('color-palette'),
  picker: prefixCls('color-palette-picker'),
  preview: prefixCls('color-palette-preview'),
  form: prefixCls('color-palette-form'),
  input: prefixCls('color-palette-input'),
  switch: prefixCls('color-palette-switch'),
  chooser: prefixCls('color-chooser'),
  range: prefixCls('color-range'),
  hue: prefixCls('color-hue'),
  opacity: prefixCls('color-opacity'),
  color: prefixCls('color-color'),
  slider: prefixCls('color-slider'),
};

const colorPaletteCss = css`
  .${cls.palette} {
    width: 100%;
    box-sizing: border-box;
    user-select: none;
  }
  .${cls.preview} {
    margin-left: 6px;
    border-radius: var(--border-radius);
    width: 46px;
    font-family: neko-icon, sans-serif;
    text-align: center;
    color: #fff;
    background-position: 0 0, 5px 5px;
    background-size: 10px 10px;
    cursor: pointer;
    line-height: 26px;
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
      border-radius: var(--border-radius);
      width: 100%;
      height: 100%;
      background-color: var(--c, #fff);
      box-shadow: rgb(0 0 0 / 10%) 0 0 0 1px inset, rgb(0 0 0 / 15%) 0 0 5px inset;
      text-shadow: var(--text-shadow);
      content: '';
    }

    &:hover::after {
      content: '\\e631';
    }

    &[data-copy='success']::after {
      content: '✓';
    }
  }
  .${cls.form} {
    display: flex;
    gap: 6px;
  }
  .${cls.input} {
    flex: 1;

    input {
      width: 100%;
      text-align: center;
    }
  }
  .${cls.switch} {
    width: 46px;
    background-color: var(--primary-color-bg);
    text-transform: uppercase;
  }
  .${cls.picker} {
    position: relative;
    border-radius: var(--border-radius);
    height: 150px;
    background: linear-gradient(to top, hsl(0deg 0% 0% / calc(var(--a))), transparent),
      linear-gradient(
        to left,
        hsl(calc(var(--h)) 100% 50% / calc(var(--a))),
        hsl(0deg 0% 100% / calc(var(--a)))
      ),
      linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0),
      linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0);
    background-position: 0 0, 0 0, 0 0, 5px 5px;
    background-size: 100% 100%, 100% 100%, 10px 10px, 10px 10px;
    opacity: 1;
    transition: opacity 0.1s;
    user-select: none;
    cursor: crosshair;

    &:active {
      opacity: 0.99;
    }

    &::after {
      position: absolute;
      top: calc((100 - var(--v)) * 1%);
      left: calc(var(--s) * 1%);
      border: 2px solid #fff;
      border-radius: 50%;
      width: 10px;
      height: 10px;
      pointer-events: none;
      content: '';
      box-sizing: border-box;
      transform: translate(-50%, -50%);
    }
  }
  .${cls.chooser} {
    display: flex;
    padding: 8px 0;
  }
  .${cls.range} {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }
  .${cls.hue} {
    background-image: linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red);
  }
  .${cls.opacity} {
    background-image: linear-gradient(
        to right,
        hsl(calc(var(--h)) 100% 50% / 0%),
        hsl(calc(var(--h)) 100% 50% / 100%)
      ),
      linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0),
      linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0);
    background-position: 0 0, 0 0, 5px 5px;
    background-size: 100% 100%, 10px 10px, 10px 10px;
  }
  .${cls.slider} {
    display: block;
    margin: 0;
    border-radius: 5px;
    width: 100%;
    height: 10px;
    outline: 0;
    pointer-events: all;
    appearance: none;

    &::-webkit-slider-runnable-track {
      position: relative;
      display: flex;
      align-items: center;
    }

    &::-webkit-slider-thumb {
      appearance: none;
      position: relative;
      border-radius: 50%;
      width: 10px;
      height: 10px;
      background: #fff;
      box-shadow: 0 0 10px rgb(0 0 0 / 10%);
      transition: 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46);
      transform: scale(1.2);
    }

    &::-moz-range-thumb {
      position: relative;
      border: 0;
      border-radius: 50%;
      width: 10px;
      height: 10px;
      background: #fff;
      box-shadow: 0 0 10px rgb(0 0 0 / 10%);
      transition: 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46);
      box-sizing: border-box;
      pointer-events: none;
      transform: scale(1.2);
    }

    &::-webkit-slider-thumb:active,
    &:focus::-webkit-slider-thumb {
      transform: scale(1.5);
    }

    &::-moz-range-thumb:active,
    &:focus::-moz-range-thumb {
      transform: scale(1.5);
    }
  }

  .${cls.color} {
    display: grid;
    padding-top: 8px;
    grid-template-columns: repeat(auto-fit, minmax(15px, 20px));
    grid-gap: 8px;

    i {
      position: relative;
      border: 0;
      border-radius: var(--border-radius);
      padding-top: 100%;
      padding-bottom: 0;
      width: 100%;
      background-color: var(--c);
      outline: 0;
      cursor: pointer;
      transition: 0.15s box-shadow ease;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        border-radius: var(--border-radius);
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0),
          linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0);
        background-position: 0 0, 5px 5px;
        background-size: 10px 10px;
        content: '';
      }

      &:hover,
      &:focus {
        box-shadow: 2px 2px 3px 0 var(--c);
      }
    }
  }
`;

injectGlobal([colorPaletteCss]);

export interface ColorPaletteProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (color: string) => void;
}
const formatterInt = (v?: number | string) => {
  return v ? parseInt((v as number).toFixed()) : v;
};
const formatterOpacity = (v?: number | string) => {
  return v ? parseInt(((v as number) * 100).toFixed()) : v;
};
const parseOpacity = (v?: string | number) => {
  let _val = v;

  if (typeof v === 'string') {
    _val = v.replace(/[^\d]/g, '');
  }

  return (_val as number) / 100;
};

interface RGBAFormProps {
  hsva: number[];
  setColor: Dispatch<SetStateAction<string>>;
}
const rgbaFlied = ['r', 'g', 'b', 'a'];
const RGBAForm: FC<RGBAFormProps> = ({ hsva, setColor }) => {
  const rgba = useMemo(() => genHSVA(...hsva).toRGBA(), [hsva]);

  return (
    <>
      {rgbaFlied.map((k, i) => {
        return (
          <InputNumber
            key={k}
            className={cls.input}
            name={k}
            size="small"
            min={0}
            max={i === 3 ? 1 : 255}
            step={i === 3 ? 0.01 : 1}
            value={rgba[i]}
            formatter={i === 3 ? formatterOpacity : formatterInt}
            parser={i === 3 && parseOpacity}
            onChange={(v?: number) => {
              const c = [...rgba];

              c[i] = v || 0;
              setColor(`rgba(${c.join(',')})`);
            }}
          />
        );
      })}
    </>
  );
};
const hslaFlied = [
  { key: 'h', max: 360 },
  { key: 's', max: 100 },
  { key: 'l', max: 100 },
  {
    key: 'a',
    step: 0.01,
    max: 1,
    formatter: formatterOpacity,
    parser: parseOpacity,
  },
];
const HSLAForm: FC<RGBAFormProps> = ({ hsva, setColor }) => {
  const hsla = useMemo(() => genHSVA(...hsva).toHSLA(), [hsva]);

  return (
    <>
      {hslaFlied.map((h, i) => {
        return (
          <InputNumber
            key={h.key}
            name={h.key}
            className={cls.input}
            min={0}
            max={h.max}
            step={h.step || 1}
            size="small"
            value={hsla[i]}
            formatter={i === 3 ? formatterOpacity : formatterInt}
            parser={i === 3 && parseOpacity}
            onChange={(v) => {
              const c = [...hsla];

              c[i] = v || 0;
              setColor(`hsla(${c[0]},${c[1]}%,${c[2]}%,${c[3]})`);
            }}
          />
        );
      })}
    </>
  );
};
const ColorPalette: FC<ColorPaletteProps> = ({
  className,
  defaultValue = '#5794ff',
  value,
  onChange,
  ...props
}) => {
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState(value || defaultValue);
  const colorRef = useRef(color);
  const [hsva, setHSVA] = useState(parseToHSVA(color));
  const hsvaRef = useRef(hsva);
  const [drag, setDrag] = useState(false);
  const val = useMemo(() => hsva.values, [hsva.values]);
  const { hex } = useMemo(() => {
    const _hsv = genHSVA(...val);

    return { hex: _hsv.toHEXA() };
  }, [val]);
  const changeColor = useCallback(
    (ev: MouseEvent) => {
      if (colorPickerRef.current) {
        const { x, y, width, height } = colorPickerRef.current.getBoundingClientRect();
        const _x = Math.min(Math.max(0, ((ev.clientX - x) / width) * 100), 100);
        const _y = Math.min(Math.max(0, ((ev.clientY - y) / height) * 100), 100);
        const _hsva = genHSVA(val[0], _x, 100 - _y, val[3]);

        setColor(_hsva[`to${hsva.type.toLocaleUpperCase()}` as HSVAVoidName]().toString());
      }
    },
    [hsva.type, val]
  );
  const colorPickerMouseDown: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      setDrag(true);
      changeColor(e as unknown as MouseEvent);
    },
    [changeColor]
  );
  const colorPickerMouseMove = useCallback(
    (e: MouseEvent) => {
      if (drag) {
        changeColor(e);
      }
    },
    [changeColor, drag]
  );
  const colorPickerMouseUp = useCallback(() => {
    setDrag(false);
  }, []);
  const handleSwitch = useCallback(() => {
    const _type = hsva.type === 'hexa' ? 'rgba' : hsva.type === 'rgba' ? 'hsla' : 'hexa';
    const _hsva = genHSVA(val[0], val[1], val[2], val[3]);

    setColor(_hsva[`to${_type.toLocaleUpperCase()}` as HSVAVoidName]().toString());
  }, [hsva.type, val]);
  const handleCopy: MouseEventHandler<HTMLDivElement> = useCallback(
    ({ target }) => {
      setClipboard(color, target as HTMLElement);
    },
    [color]
  );

  const styleProperty = useMemo(() => {
    return {
      '--c': hex.toString(),
      '--h': val[0],
      '--s': val[1],
      '--v': val[2],
      '--a': val[3],
    } as React.CSSProperties;
  }, [val, hex]);

  useEffect(() => {
    if (value !== colorRef.current) {
      setColor(value || defaultValue);
    }
  }, [defaultValue, value]);
  useEffect(() => {
    Object.assign(colorRef, {
      current: color,
    });
    const _color = parseToHSVA(color);
    const _hsva = genHSVA(..._color.values);

    Object.assign(hsvaRef, {
      current: _color,
    });
    setHSVA(_color);
    if (onChange) {
      onChange(_hsva[`to${hsva.type.toLocaleUpperCase()}` as HSVAVoidName]().toString());
    }
  }, [color, onChange, hsva.type]);

  useEffect(() => {
    document.body.addEventListener('mousemove', colorPickerMouseMove, passiveSupported);
    document.body.addEventListener('mouseup', colorPickerMouseUp, passiveSupported);
    return () => {
      document.body.removeEventListener('mousemove', colorPickerMouseMove, passiveSupported);
      document.body.removeEventListener('mouseup', colorPickerMouseUp, passiveSupported);
    };
  }, [colorPickerMouseMove, colorPickerMouseUp]);

  const renderForm = useCallback(() => {
    switch (hsva.type) {
      case 'hexa':
        return (
          <Input
            className={cls.input}
            name="hex"
            size="small"
            value={hex.toString()}
            onChange={(v) => {
              if (v) {
                setColor(v as string);
              }
            }}
          />
        );
      case 'rgba':
        return <RGBAForm hsva={val} setColor={setColor} />;
      case 'hsla':
        return <HSLAForm hsva={val} setColor={setColor} />;
      default:
        return null;
    }
  }, [hex, hsva.type, val]);

  return (
    <div {...props} className={classNames(cls.palette, className)} style={styleProperty}>
      <div className={cls.picker} ref={colorPickerRef} onMouseDown={colorPickerMouseDown} />
      <div className={cls.chooser}>
        <div className={cls.range}>
          <input
            className={classNames(cls.slider, cls.hue)}
            min="0"
            max="360"
            type="range"
            value={val[0]}
            onChange={(e) => {
              const _hsva = genHSVA(Number(e.target.value), val[1], val[2], val[3]);

              setColor(_hsva[`to${hsva.type.toLocaleUpperCase()}` as HSVAVoidName]().toString());
            }}
          />
          <input
            className={classNames(cls.slider, cls.opacity)}
            min="0"
            max="1"
            step="0.01"
            type="range"
            value={val[3]}
            onChange={(e) => {
              const _hsva = genHSVA(val[0], val[1], val[2], Number(e.target.value));

              setColor(_hsva[`to${hsva.type.toLocaleUpperCase()}` as HSVAVoidName]().toString());
            }}
          />
        </div>
        <div className={cls.preview} onClick={handleCopy} />
      </div>
      <div className={cls.form}>
        {renderForm()}
        <Button flat type="primary" size="small" className={cls.switch} onClick={handleSwitch}>
          {hsva.type}
        </Button>
      </div>
      <div className={cls.color}>
        {colors.map((c) => (
          <i
            key={c}
            style={
              {
                '--c': c,
              } as CSSProperties
            }
            onClick={() => {
              setColor(c);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
