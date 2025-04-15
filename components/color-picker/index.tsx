import {
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onMount,
  splitProps,
  untrack,
} from 'solid-js';
import { cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { BasicConfig, ColorPaletteProps, CustomElement, PopoverProps } from '..';
import { clearAttribute } from '../basic-config';
import ColorPalette from '../color-palette';
import Popover, { defaultProps } from '../popover';
import { inline } from '../theme';

import { style } from './style';

/** 颜色选择器
 * @since 2.0.0
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

  function handleChange(e: CustomEvent<string>) {
    if (local.value === void 0) {
      setColor(e.detail);
    }
    local.onChange?.(e.detail);
  }

  onMount(() => {
    if (local.value === void 0 && local.defaultValue) {
      setColor(local.defaultValue);
    }
  });
  createEffect(() => {
    if (local.value !== void 0 && local.value !== untrack(color)) {
      setColor(local.value);
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
      content={<n-color-palette value={color()} onChange={handleChange} />}
      popupClass={cx('color-picker', local.popupClass)}
      popupCss={popupCss()}
      css={css()}
    >
      <span class={cx('trigger', local.size)} />
    </Popover>
  );
}

ColorPicker.registry = () => {
  ColorPalette.registry();
  customElement<ColorPickerProps>(
    'n-color-picker',
    {
      ...defaultProps,
      value: void 0,
      defaultValue: void 0,
      onChange: void 0,
      size: void 0,
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

      createEffect(() => {
        clearAttribute(el, ['popupCss', 'css']);
      });
      return (
        <>
          <style textContent={inline} />
          <ColorPicker {...props} />
        </>
      );
    },
  );
};
export default ColorPicker;
