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
import type { BasicConfig, CustomElement, PopoverProps } from '../index';

/** 颜色选择器
 * @since 2.0.0
 * @see {@link /neko-ui/color-palette|ColorPaletteProps}
 * @see {@link /neko-ui/popover|PopoverProps}
 */
export interface ColorPickerProps
  extends ColorPaletteProps,
    Omit<PopoverProps, 'children' | 'content'> {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 关闭后是否销毁  */
  destroyInactive?: boolean;
  /** 尺寸
   * @default 'normal'
   * @see {@link /neko-ui/basic-config|BasicConfig}
   */
  size?: BasicConfig['size'];
  /** 默认值  */
  defaultValue?: string;
}
export type ColorPickerElement = CustomElement<ColorPickerProps>;

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
    () => `.color-picker {padding: 10px;inline-size: 216px;}${local.popupCss || ''}`,
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
            }),
          );
        },
        children: el.children,
      },
      _,
    );

    return createComponent(ColorPicker, props);
  },
);

export default ColorPicker;
