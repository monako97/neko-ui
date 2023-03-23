import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FC,
  type HTMLAttributes,
  useId,
} from 'react';
import { css, injectGlobal } from '@emotion/css';
import {
  classNames,
  colorParse,
  passiveSupported,
  setClipboard,
  throttle,
  // updateStyleRule,
  type HSVA,
  type ColorType,
  hexToHsv,
  rgbToHsv,
} from '@moneko/common';
import { Input, InputNumber } from '../index';
import prefixCls from '../prefix-cls';

const material = [
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
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9E9E9E',
  '#607D8B',
  'rgba(0,0,0,.65)',
  'transparent',
];
const cls = {
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
  cmykHue: prefixCls('color-slider-cmyk-hue'),
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
    min-height: 26px;
    font-family: neko-icon, sans-serif;
    text-align: center;
    color: #fff;
    background-position: 0 0, 5px 5px;
    background-size: 10px 10px;
    cursor: pointer;
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
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    width: 46px;
    font-size: 12px;
    text-align: center;
    color: var(--primary-color);
    background-color: var(--primary-color-bg);
    text-transform: uppercase;
    outline-color: var(--primary-color-outline);
    transition-property: background-color, color, outline-color, border-radius, transform;
    transition-timing-function: var(--transition-timing-function);
    transition-duration: var(--transition-duration);

    &:hover {
      color: var(--primary-color-hover);
    }

    &:active {
      color: var(--primary-color-active);
      transform: scale(0.98);
    }
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
  .${cls.cmykHue}.${cls.slider} {
    &::-webkit-slider-thumb {
      width: 26px;
      height: 26px;
    }

    &::-moz-range-thumb {
      width: 26px;
      height: 26px;
    }
  }
  .${cls.slider} {
    flex: 1;
    display: block;
    margin: 0;
    border-radius: 5px;
    width: 100%;
    height: 10px;
    outline: 0;
    cursor: pointer;
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
function formatterOpacity(v?: number | string) {
  return v ? Number(((v as number) * 100).toFixed()) : v;
}
function parseOpacity(v?: string | number) {
  let _val = v;

  if (typeof v === 'string') {
    _val = v.replace(/[^\d]/g, '');
  }

  return (_val as number) / 100;
}

type Opt = Record<
  ColorType,
  {
    get: 'toRgba' | 'toHexa' | 'toHsla' | 'toHsva' | 'toCmyk';
    next: ColorType;
    max: number[];
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
    hsv: (c: any) => HSVA;
  }
>;

const opt: Opt = {
  hexa: {
    get: 'toHexa',
    next: 'rgba',
    max: [255, 255, 255, 1],
    hsv: hexToHsv,
  },
  rgba: {
    get: 'toRgba',
    next: 'hsla',
    max: [255, 255, 255, 1],
    hsv: rgbToHsv,
  },
  hsla: {
    get: 'toHsla',
    next: 'hsva',
    max: [360, 100, 100, 1],
    hsv: rgbToHsv,
  },
  hsva: {
    get: 'toHsva',
    next: 'cmyk',
    max: [360, 100, 100, 1],
    hsv: rgbToHsv,
  },
  cmyk: {
    get: 'toCmyk',
    next: 'hexa',
    max: [100, 100, 100, 100],
    hsv: rgbToHsv,
  },
};

// eslint-disable-next-line no-unused-vars
const HexaForm: React.FC<{ value?: string; onChange: (hex?: string) => void }> = ({
  value,
  onChange,
}) => {
  const [hex, setHex] = useState(value);

  useEffect(() => {
    setHex(value);
  }, [value]);

  return (
    <Input
      className={cls.input}
      name="hex"
      size="small"
      value={hex}
      onChange={(v) => {
        if (typeof v === 'string') {
          setHex(v);
          throttle(onChange, 16)(v);
        }
      }}
    />
  );
};
const ColorPalette: FC<ColorPaletteProps> = ({
  className,
  defaultValue = '#5794ff',
  value,
  onChange,
  ...props
}) => {
  const id = useId();
  // const selector = useRef(`[data-id="${id}"]`);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const color = useRef(colorParse(value || defaultValue));
  const drag = useRef(false);
  const [type, setType] = useState(color.current.type);
  const [hsva, setHSVA] = useState(color.current.value);
  const [inputVal, setInputVal] = useState(color.current[opt[type].get]() as HSVA);
  const setColor = useCallback((c?: string | number) => {
    if (c && color.current[opt[color.current.type].get]().toString() !== c) {
      const nc = colorParse(c as string);

      color.current.setValue(nc.value);
      color.current.type = nc.type;
      setInputVal(color.current[opt[color.current.type].get]() as HSVA);
      setType(color.current.type);
      setHSVA(color.current.value);
    }
  }, []);
  const changeColor = useCallback((ev: MouseEvent) => {
    if (colorPickerRef.current) {
      const _hsva: HSVA = [...color.current.value];
      const { x, y, width, height } = colorPickerRef.current.getBoundingClientRect();

      _hsva[1] = Math.floor(Math.min(Math.max(0, ((ev.clientX - x) / width) * 100), 100));
      _hsva[2] = Math.floor(100 - Math.min(Math.max(0, ((ev.clientY - y) / height) * 100), 100));
      color.current.setValue(_hsva);
      setHSVA(_hsva);
    }
  }, []);
  const colorPickerMouseDown = useCallback(
    (e: React.MouseEvent) => {
      Object.assign(drag, {
        current: true,
      });
      changeColor(e as unknown as MouseEvent);
    },
    [changeColor]
  );
  const colorPickerMouseMove = useCallback(
    (e: MouseEvent) => {
      if (drag.current) {
        changeColor(e);
      }
    },
    [changeColor]
  );
  const colorPickerMouseUp = useCallback(() => {
    Object.assign(drag, {
      current: false,
    });
  }, []);
  const handleSwitch = useCallback(() => {
    color.current.type = opt[color.current.type].next;
    setInputVal(color.current[opt[color.current.type].get]() as HSVA);
    setType(color.current.type);
  }, []);
  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      setClipboard(inputVal.toString(), e.target as HTMLElement);
    },
    [inputVal]
  );
  const setHue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const _hsva: HSVA = [...color.current.value];

    _hsva[0] = Number(e.target.value);
    setHSVA(_hsva);
  }, []);
  const setAlpha = useCallback((e: { target: { value: string } }) => {
    const _hsva: HSVA = [...color.current.value];

    _hsva[3] = Number(e.target.value);
    setHSVA(_hsva);
  }, []);
  const handleFliedChange = useCallback(
    (i: number, v?: number) => {
      if (typeof v === 'number') {
        const old: HSVA = color.current[opt[color.current.type].get]() as HSVA;

        old[i] = v || 0;
        setInputVal(old);
        if (i === 3 && color.current.type !== 'cmyk') {
          setAlpha({ target: { value: (v || 0) as unknown as string } });
        } else {
          setHSVA(colorParse(old.toString()).value);
        }
      }
    },
    [setAlpha]
  );
  const handleHexChange = useCallback(
    (hex?: string) => {
      if (hex && color.current.isColor(hex)) {
        setColor(hex);
      }
    },
    [setColor]
  );

  useEffect(() => {
    throttle(setColor, 4)(value);
  }, [setColor, value]);
  useEffect(() => {
    color.current.setValue(hsva);
    color.current.type = type;
    setInputVal(color.current[opt[type].get]() as HSVA);
  }, [hsva, type]);
  useEffect(() => {
    onChange?.(inputVal.toString());
  }, [onChange, inputVal, setColor]);
  // useEffect(() => {
  //   throttle(updateStyleRule, 8)(
  //     {
  //       '--c': color.current.toRgbaString(),
  //       '--h': hsva[0],
  //       '--s': hsva[1],
  //       '--v': hsva[2],
  //       '--a': hsva[3],
  //     } as unknown as Record<string, string>,
  //     selector.current
  //   );
  // }, [hsva]);
  useEffect(() => {
    document.documentElement.addEventListener('mousemove', colorPickerMouseMove, passiveSupported);
    document.documentElement.addEventListener('mouseup', colorPickerMouseUp, passiveSupported);
    return () => {
      document.documentElement.removeEventListener(
        'mousemove',
        colorPickerMouseMove,
        passiveSupported
      );
      document.documentElement.removeEventListener('mouseup', colorPickerMouseUp, passiveSupported);
    };
  }, [colorPickerMouseMove, colorPickerMouseUp]);

  return (
    <div
      {...props}
      data-id={id}
      className={classNames(cls.palette, className)}
      style={
        {
          '--c': color.current.toRgbaString(),
          '--h': hsva[0],
          '--s': hsva[1],
          '--v': hsva[2],
          '--a': hsva[3],
        } as React.CSSProperties
      }
    >
      <div className={cls.picker} ref={colorPickerRef} onMouseDown={colorPickerMouseDown} />
      <div className={cls.chooser}>
        <div className={cls.range}>
          <input
            className={classNames(cls.slider, cls.hue, type === 'cmyk' && cls.cmykHue)}
            min="0"
            max="360"
            type="range"
            value={hsva[0]}
            onChange={setHue}
          />
          {type !== 'cmyk' ? (
            <input
              className={classNames(cls.slider, cls.opacity)}
              min="0"
              max="1"
              step="0.01"
              type="range"
              value={hsva[3]}
              onChange={setAlpha}
            />
          ) : null}
        </div>
        <div className={cls.preview} onClick={handleCopy} />
      </div>
      <div className={cls.form}>
        {type === 'hexa' ? (
          <HexaForm value={inputVal.toString()} onChange={handleHexChange} />
        ) : (
          inputVal.map((n, i) => {
            const isAlpha = i === 3 && type !== 'cmyk';

            return (
              <InputNumber
                size="small"
                key={type + i}
                className={cls.input}
                value={n}
                max={opt[type].max[i]}
                min={0}
                step={isAlpha ? 0.01 : 1}
                formatter={isAlpha ? formatterOpacity : null}
                parser={isAlpha ? parseOpacity : null}
                onChange={(v) => handleFliedChange(i, v)}
              />
            );
          })
        )}
        <div className={cls.switch} onClick={handleSwitch}>
          {type}
        </div>
      </div>
      <div className={cls.color}>
        {material.map((c) => (
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
