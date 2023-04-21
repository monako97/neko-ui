import React, { useEffect, useRef } from 'react';
import {
  colorParse,
  passiveSupported,
  setClipboard,
  throttle,
  type ColorType,
  type HSVA,
} from '@moneko/common';
import sso from 'shared-store-object';
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

const ColorPalette: React.FC<ColorPaletteProps> = ({
  className,
  defaultValue = '#5794ff',
  value,
  onChange,
  ...props
}) => {
  const picker = useRef<HTMLDivElement>(null);
  const store = useRef(
    sso(
      {
        ...colorParse(value || defaultValue),
        drag: false,
        timer: null as NodeJS.Timeout | null,
        hexa: (value || defaultValue) as string | undefined | number,
        handleHexa(v?: string | number) {
          store.current.hexa = v;
        },
        handleAlphaRange(e: React.ChangeEvent<HTMLInputElement>) {
          store.current.setAlpha(Number(e.target.value));
        },
        setAlpha(alpha: number) {
          const next: HSVA = [...store.current.value];

          next[3] = alpha || 0;
          store.current.value = next;
        },
        setHue(e: React.ChangeEvent<HTMLInputElement>) {
          const next: HSVA = [...store.current.value];

          next[0] = Number(e.target.value);
          store.current.value = next;
        },
        setColor(c: string = defaultValue) {
          if (
            store.current.isColor(c) &&
            store.current[opt[store.current.type].get]().toString() !== c
          ) {
            const next = colorParse(c as string);

            store.current.type = next.type;
            store.current.value = next.value;
          }
        },
        changeColor(ev: MouseEvent | React.MouseEvent) {
          if (picker.current) {
            const next: HSVA = [...store.current.value];
            const { x, y, width, height } = picker.current.getBoundingClientRect();

            next[1] = Math.floor(Math.min(Math.max(0, ((ev.clientX - x) / width) * 100), 100));
            next[2] = Math.floor(
              100 - Math.min(Math.max(0, ((ev.clientY - y) / height) * 100), 100)
            );
            store.current.value = next;
          }
        },
        handleChange(i: number, v?: number) {
          if (typeof v === 'number') {
            if (i === 3 && store.current.type !== 'cmyk') {
              store.current.setAlpha(v || 0);
            } else {
              const old: HSVA = store.current[opt[store.current.type].get]() as HSVA;

              old[i] = v || 0;
              store.current.value = colorParse(old.toString()).value;
            }
          }
        },
        mouseDown(e: React.MouseEvent) {
          store.current.drag = true;
          store.current.changeColor(e);
        },
        mouseMove(e: MouseEvent) {
          if (store.current.drag) {
            store.current.changeColor(e);
          }
        },
        mouseUp() {
          store.current.drag = false;
        },
        switch() {
          store.current.type = opt[store.current.type].next;
        },
        copy(e: React.MouseEvent) {
          setClipboard(store.current.color.toString(), e.target as HTMLElement);
        },
      },
      {
        color() {
          store.current.setValue(store.current.value);
          return store.current[opt[store.current.type].get]() as HSVA;
        },
        style() {
          return {
            '--c': store.current.toRgbaString(),
            '--h': store.current.value[0],
            '--s': store.current.value[1],
            '--v': store.current.value[2],
            '--a': store.current.value[3],
          } as React.CSSProperties;
        },
      }
    )
  );
  const { type, value: hsva, color, style, hexa } = store.current;

  useEffect(() => {
    throttle(store.current.setColor, 4)(value);
  }, [defaultValue, value]);
  useEffect(() => {
    onChange?.(color.toString());
  }, [onChange, color]);
  useEffect(() => {
    if (store.current.timer) {
      clearTimeout(store.current.timer);
    }
    if (type === 'hexa') {
      store.current.hexa = store.current.toHexaString();
    }
  }, [type, hsva]);
  useEffect(() => {
    const _store = store.current;

    window.addEventListener('mousemove', _store.mouseMove, passiveSupported);
    window.addEventListener('mouseup', _store.mouseUp, passiveSupported);
    return () => {
      if (_store.timer) {
        clearTimeout(_store.timer);
      }
      window.removeEventListener('mousemove', _store.mouseMove, passiveSupported);
      window.removeEventListener('mouseup', _store.mouseUp, passiveSupported);
      _store();
    };
  }, []);

  return (
    <div {...props} className={cx(cls.palette, className)} style={style}>
      <div ref={picker} className={cls.picker} onMouseDown={store.current.mouseDown} />
      <div className={cls.chooser}>
        <div className={cls.range}>
          <input
            className={cx(cls.slider, cls.hue, type === 'cmyk' && cls.cmykHue)}
            min="0"
            max="360"
            type="range"
            value={hsva[0]}
            onChange={store.current.setHue}
          />
          {type !== 'cmyk' ? (
            <input
              className={cx(cls.slider, cls.opacity)}
              min="0"
              max="1"
              step="0.01"
              type="range"
              value={hsva[3]}
              onChange={store.current.handleAlphaRange}
            />
          ) : null}
        </div>
        <div className={cls.preview} onClick={store.current.copy} />
      </div>
      <div className={cls.form}>
        {type === 'hexa' ? (
          <Input
            className={cls.input}
            name="hex"
            size="small"
            value={hexa}
            onChange={store.current.handleHexa}
            onBlur={(e) => {
              store.current.setColor(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter' && typeof hexa === 'string') {
                store.current.setColor(hexa);
              }
            }}
          />
        ) : (
          color.map((n, i) => {
            const isAlpha = i === 3 && type !== 'cmyk';

            return (
              <InputNumber
                key={type + i}
                size="small"
                className={cls.input}
                value={n}
                max={opt[type].max[i]}
                min={0}
                step={isAlpha ? 0.01 : 1}
                formatter={isAlpha ? formatterOpacity : null}
                parser={isAlpha ? parseOpacity : null}
                onChange={(v) => store.current.handleChange(i, v)}
              />
            );
          })
        )}
        <div className={cls.switch} onClick={store.current.switch}>
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
              store.current.setColor(c);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
