import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  colorParse,
  passiveSupported,
  setClipboard,
  throttle,
  type ColorType,
  type HSVA,
} from '@moneko/common';
import { cls } from './style';
import { cx } from '../emotion';
import { Input, InputNumber } from '../index';

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

export interface ColorPaletteProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
  }
>;

const opt: Opt = {
  hexa: {
    get: 'toHexa',
    next: 'rgba',
    max: [255, 255, 255, 1],
  },
  rgba: {
    get: 'toRgba',
    next: 'hsla',
    max: [255, 255, 255, 1],
  },
  hsla: {
    get: 'toHsla',
    next: 'hsva',
    max: [360, 100, 100, 1],
  },
  hsva: {
    get: 'toHsva',
    next: 'cmyk',
    max: [360, 100, 100, 1],
  },
  cmyk: {
    get: 'toCmyk',
    next: 'hexa',
    max: [100, 100, 100, 100],
  },
};

interface HexaFormProps {
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (hex: string) => void;
}
const HexaForm: React.FC<HexaFormProps> = ({ value, onChange }) => {
  const [hex, setHex] = useState(value);
  const hexChange = useCallback(
    (v?: string | number) => {
      if (typeof v === 'string') {
        setHex(v);
        throttle(onChange, 4)(v);
      }
    },
    [onChange]
  );

  useEffect(() => {
    setHex(value);
  }, [value]);

  return <Input className={cls.input} name="hex" size="small" value={hex} onChange={hexChange} />;
};
const ColorPalette: React.FC<ColorPaletteProps> = ({
  className,
  defaultValue = '#5794ff',
  value,
  onChange,
  ...props
}) => {
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
    (hex: string) => {
      if (color.current.isColor(hex)) {
        setColor(hex);
      }
    },
    [setColor]
  );
  const style = useMemo(() => {
    return {
      '--c': color.current.toRgbaString(),
      '--h': hsva[0],
      '--s': hsva[1],
      '--v': hsva[2],
      '--a': hsva[3],
    } as React.CSSProperties;
  }, [hsva]);

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
  }, [onChange, inputVal]);
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
    <div {...props} className={cx(cls.palette, className)} style={style}>
      <div className={cls.picker} ref={colorPickerRef} onMouseDown={colorPickerMouseDown} />
      <div className={cls.chooser}>
        <div className={cls.range}>
          <input
            className={cx(cls.slider, cls.hue, type === 'cmyk' && cls.cmykHue)}
            min="0"
            max="360"
            type="range"
            value={hsva[0]}
            onChange={setHue}
          />
          {type !== 'cmyk' ? (
            <input
              className={cx(cls.slider, cls.opacity)}
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
              } as React.CSSProperties
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
