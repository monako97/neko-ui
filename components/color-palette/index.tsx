import {
  For,
  Index,
  type JSX,
  Show,
  createComponent,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
  untrack,
} from 'solid-js';
import {
  type ColorParse,
  type ColorType,
  type HSVA,
  colorParse,
  isFunction,
  passiveSupported,
  setClipboard,
  throttle,
} from '@moneko/common';
import { cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { style, switchCss } from './style';
import '../dropdown';
import '../input';
import '../input-number';
import { baseStyle } from '../theme';
import type { CustomElement, InputNumberProps } from '../index';

export interface ColorPaletteProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 颜色值 */
  value?: string;
  /** 默认值
   * @default '#5794ff'
   */
  defaultValue?: string;
  /** 变更时触发的方法 */
  onChange?: (color: string) => void;
}
export type ColorPaletteElement = CustomElement<ColorPaletteProps>;

function ColorPalette(_: ColorPaletteProps) {
  const props = mergeProps({ defaultValue: '#5794ff' }, _);
  let picker: HTMLDivElement | undefined;
  const types = [
    { label: 'RGBA', value: 'rgba', handleClosed: false },
    { label: 'HSLA', value: 'hsla', handleClosed: false },
    { label: 'HEXA', value: 'hexa', handleClosed: false },
  ];
  const material = [
    '#f44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#CDDC39',
    '#FF9800',
    '#795548',
    '#607D8B',
  ];
  const inputProps: InputNumberProps = {
    class: 'input',
    size: 'small',
    css: '.input{text-align:center;font-size:12px;}',
  };
  const [hsva, setHsva] = createSignal<ColorParse<HSVA>>(
    // eslint-disable-next-line solid/reactivity
    colorParse(props.value || props.defaultValue),
  );
  const [drag, setDrag] = createSignal(false);

  type HsvaToColorVoid = 'toHexa' | 'toRgba' | 'toHsla' | 'toCmyk' | 'toHsva';

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
  function capFirst(str: string) {
    return `to${str[0].toUpperCase() + str.slice(1)}` as HsvaToColorVoid;
  }
  const color = createMemo(() => {
    const s = hsva();
    const c = s[capFirst(s.type)]();

    if (isFunction(props.onChange) && c.toString() !== props.value) {
      props.onChange(c.toString());
    }
    return c;
  });

  function setColor(c = props.defaultValue) {
    if (untrack(color).toString() !== c) {
      setHsva(colorParse(c as string));
    }
  }
  function handleHexa(e: CustomEvent) {
    if (e.target) {
      (e.target as HTMLInputElement).value = e.detail;
    }
  }
  function handleHexaBlur(e: FocusEvent & { target: { value: string } }) {
    if (e.target?.value) {
      setColor(e.target.value);
    }
  }
  function handleHexaEnter(e: KeyboardEvent & { target: { value: string } }) {
    if (e.key === 'Enter' && typeof e.target?.value === 'string') {
      setColor(e.target.value);
    }
  }
  function changeColor(ev: MouseEvent) {
    if (picker) {
      const { x, y, width, height } = picker.getBoundingClientRect();
      const prev = untrack(hsva);
      const next = prev.value;

      next[1] = Math.floor(Math.min(Math.max(0, ((ev.clientX - x) / width) * 100), 100));
      next[2] = Math.floor(100 - Math.min(Math.max(0, ((ev.clientY - y) / height) * 100), 100));

      setHsva({ ...prev, value: next });
    }
  }

  function handleChange(i: number, v?: number, t?: ColorType) {
    if (typeof v === 'number') {
      const prev = untrack(hsva);
      const changeHsv = i === 3 || t === 'hsva';
      const next = changeHsv ? prev.value : (untrack(color) as HSVA);

      next[i] = v || 0;
      if (changeHsv) {
        setHsva({
          ...prev,
          value: next,
        });
      } else {
        setHsva(colorParse(next.toString()));
      }
    }
  }
  function mouseDown(e: MouseEvent) {
    setDrag(true);
    changeColor(e);
  }
  function mouseMove(e: MouseEvent) {
    if (untrack(drag)) {
      changeColor(e);
    }
  }
  function mouseUp() {
    setDrag(false);
  }
  function handleSwitch(e: CustomEvent) {
    setHsva((prev) => ({
      ...prev,
      type: e.detail[0],
    }));
  }

  function copy(e: MouseEvent) {
    setClipboard(untrack(color).toString(), e.target as HTMLElement);
  }
  async function eyeDropper() {
    if (window.EyeDropper) {
      const res = await new window.EyeDropper().open();

      if (res.sRGBHex) {
        setColor(res.sRGBHex);
      }
      return;
    }
  }
  const colorVar = createMemo(() => {
    const h = hsva(),
      value = h.value;

    return `.palette {--c:${h.toRgbaString()};--h:${value[0]};--s:${value[1]};--v:${value[2]};--a:${
      value[3]
    };}`;
  });

  createEffect(() => {
    throttle(setColor, 8)(props.value);
  });

  onMount(() => {
    document.body.addEventListener('mousemove', mouseMove, passiveSupported);
    document.body.addEventListener('mouseup', mouseUp, passiveSupported);
  });
  onCleanup(() => {
    document.body.removeEventListener('mousemove', mouseMove, passiveSupported);
    document.body.removeEventListener('mouseup', mouseUp, passiveSupported);
  });

  return (
    <>
      <style>
        {baseStyle()}
        {style}
        {colorVar()}
      </style>
      <div class={cx('palette', props.class)}>
        <div ref={picker} class="picker" onMouseDown={mouseDown} />
        <div class="chooser">
          <div class="range">
            <input
              class="slider hue"
              min="0"
              max="360"
              type="range"
              value={hsva().value[0]}
              onInput={(e) => handleChange(0, Number(e.target.value), 'hsva')}
            />
            <input
              class="slider opacity"
              min="0"
              max="1"
              step="0.01"
              type="range"
              value={hsva().value[3]}
              onInput={(e) => handleChange(3, Number(e.target.value))}
            />
          </div>
          <div class="preview" onClick={copy} />
        </div>
        <div class="form">
          <Show
            when={hsva().type === 'hexa'}
            fallback={
              <>
                <Index each={color()}>
                  {(n, i) => {
                    const inp = Object.assign(
                      {},
                      inputProps,
                      i === 3 && {
                        step: 0.01,
                        formatter: formatterOpacity,
                        parse: parseOpacity,
                      },
                    );

                    return (
                      <n-input-number
                        {...inp}
                        value={n() as number}
                        max={
                          (
                            untrack(color) as HSVA & {
                              max: [360, 100, 100, 1];
                            }
                          ).max[i]
                        }
                        min={0}
                        onChange={(e) => {
                          handleChange(i, e.detail);
                        }}
                      />
                    );
                  }}
                </Index>
              </>
            }
          >
            <n-input
              {...inputProps}
              value={hsva().toHexaString()}
              onChange={handleHexa}
              onBlur={handleHexaBlur}
              onKeyUp={handleHexaEnter}
            />
          </Show>
          <n-dropdown
            css={switchCss}
            value={hsva().type}
            items={types}
            placement="right"
            trigger="click"
            onChange={handleSwitch}
          >
            <span class="switch">{hsva().type}</span>
          </n-dropdown>
        </div>
        <div class="color">
          <Show
            when={window.EyeDropper}
            fallback={
              <i
                style={{ '--c': 'rgba(168,16,16,0.15)' }}
                onClick={setColor.bind(null, 'rgba(168,16,16,0.15)')}
              />
            }
          >
            <i class="eye-dropper" style={{ '--c': 'transparent' }} onClick={eyeDropper} />
          </Show>
          <For each={material}>
            {(c) => <i style={{ '--c': c }} onClick={setColor.bind(null, c)} />}
          </For>
        </div>
      </div>
    </>
  );
}

export const defaultColorPaletteProps = {
  class: undefined,
  style: undefined,
  css: undefined,
  value: undefined,
  defaultValue: undefined,
  onChange: undefined,
};

customElement('n-color-palette', defaultColorPaletteProps, (_, opts) => {
  const el = opts.element;
  const props = mergeProps(
    {
      onChange(val?: string) {
        el.dispatchEvent(
          new CustomEvent('change', {
            detail: val,
          }),
        );
      },
    },
    _,
  );

  return createComponent(ColorPalette, props);
});

export default ColorPalette;
