import {
  createComponent,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onMount,
  splitProps,
} from 'solid-js';
import { cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { style } from './style';
import ColorPalette, { type ColorPaletteProps } from '../color-palette';
import Popover, { defaultProps } from '../popover';
import type { ComponentSize, PopoverProps } from '../index';

export interface ColorPickerProps
  extends ColorPaletteProps,
    Omit<PopoverProps, 'children' | 'content'> {
  destroyInactive?: boolean;
  popupClassName?: string;
  size?: ComponentSize;
  defaultValue?: string;
  popupClass?: string;
}

function ColorPicker(props: ColorPickerProps) {
  const [local, others] = splitProps(props, [
    'css',
    'value',
    'defaultValue',
    'onChange',
    'popupClass',
    'popupCss',
    'size',
  ]);
  const [color, setColor] = createSignal<string | undefined>(local.defaultValue);

  function handleChange(e: string) {
    if (local.value === undefined) {
      setColor(e);
    }
    local.onChange?.(e);
  }

  createEffect(() => {
    setColor(local.value);
  });
  onMount(() => {
    if (local.value === undefined && local.defaultValue) {
      setColor(local.defaultValue);
    }
  });
  const popupCss = createMemo(
    () => `.color-picker {padding: 10px;inline-size: 216px;}${local.popupCss || ''}`
  );
  const css = createMemo(() => `${style + (local.css || '')}.trigger {--c: ${color()};}`);

  return (
    <Popover
      {...others}
      arrow={true}
      trigger="click"
      content={<ColorPalette value={color()} onChange={handleChange} />}
      popupClass={cx('color-picker', local.popupClass)}
      popupCss={popupCss()}
      css={css()}
    >
      <span class={cx('trigger', local.size)} />
    </Popover>
  );
}

export interface ColorPickerElement extends Omit<ColorPickerProps, 'onChange'> {
  ref?: ColorPickerElement | { current: ColorPickerElement | null };
  // eslint-disable-next-line no-unused-vars
  onChange?(e: CustomEvent<string>): void;
}

interface CustomElementTags {
  'n-color-picker': ColorPickerElement;
}
declare module 'solid-js' {
  export namespace JSX {
    export interface IntrinsicElements extends HTMLElementTags, CustomElementTags {}
  }
}
declare global {
  export namespace JSX {
    export interface IntrinsicElements extends CustomElementTags, CustomElementTags {}
  }
}

customElement(
  'n-color-picker',
  {
    ...defaultProps,
    value: undefined,
    defaultValue: undefined,
    onChange: undefined,
    size: undefined,
  },
  (_, opts) => {
    const el = opts.element;
    const props = mergeProps(
      {
        onChange(val?: string) {
          el.dispatchEvent(
            new CustomEvent('change', {
              detail: val,
            })
          );
        },
        children: el.children,
      },
      _
    );

    return createComponent(ColorPicker, props);
  }
);

export default ColorPicker;
