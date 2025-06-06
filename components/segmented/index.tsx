import { createEffect, createMemo, createSignal, For, mergeProps, Show } from 'solid-js';
import { isFunction } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { BaseOption, BasicConfig, CustomElement } from '..';
import { clearAttribute, FieldName, type JSXElement } from '../basic-config';
import getOptions from '../get-options';
import theme, { inline } from '../theme';
import Typography from '../typography';

import { style } from './style';

export interface SegmentedProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** input[type="radio"] 的 name 属性 */
  name?: string;
  /** 只读 */
  disabled?: boolean;
  /** 值 */
  value?: string | number;
  /** 默认值 */
  defaultValue?: string | number;
  /** 选项数据 */
  options?: (BaseOption | string | number)[];
  /** 自定义节点 'label'、'value'、'options' 的字段 */
  fieldNames?: BasicConfig['fieldName'];
  /** 值修改时的回调方法 */
  onChange?(val: string | number): void;
}

function Segmented(props: SegmentedProps) {
  const { baseStyle, isDark } = theme;
  const [value, setValue] = createSignal(props.defaultValue);
  const [offsetStyle, setOffsetStyle] = createSignal('');
  let box: HTMLDivElement | undefined;
  const cssVar = createMemo(() => {
    const dark = isDark();

    return css({
      ':host': {
        '--segmented-bg': dark ? '#000' : 'var(--primary-details-bg)',
        '--segmented-current-bg': dark ? '#1f1f1f' : '#fff',
      },
    });
  });
  const fieldNames = createMemo(() => Object.assign({}, FieldName, props.fieldNames));

  function onChange(item: BaseOption) {
    if (!props.disabled && !item.disabled) {
      const next = item[fieldNames().value];

      if (isFunction(props.onChange)) {
        props.onChange(next);
      }
      if (props.value === void 0) {
        setValue(next);
      }
    }
  }
  function onKeyUp(key: string, item: BaseOption) {
    if (key === 'Enter') {
      onChange(item);
    }
  }
  const options = createMemo(() => {
    return getOptions(props.options, fieldNames());
  });

  createEffect(() => {
    setValue((props.value !== void 0 && props.value) || props.defaultValue);
  });

  createEffect(() => {
    const val = options().find((o) => o[fieldNames().value] === value());
    const timer = setTimeout(() => {
      clearTimeout(timer);
      const el = val?.ref;

      if (el) {
        setOffsetStyle(
          `.box {--w: ${el.offsetWidth}px;--h: ${el.offsetHeight}px;--left: ${el.offsetLeft}px;}`,
        );
      } else {
        setOffsetStyle('');
      }
    }, 0);
  });

  return (
    <>
      <style textContent={baseStyle()} />
      <style textContent={cssVar()} />
      <style textContent={style} />
      <style textContent={offsetStyle()} />
      <Show when={props.css}>
        <style textContent={css(props.css)} />
      </Show>
      <div ref={box} class={cx('box', props.class)}>
        <For each={options()}>
          {(item, i) => {
            const readOnly = props.disabled || item.disabled;
            const handleChange = () => {
              onChange(item);
            };
            const fieldName = fieldNames();

            return (
              <>
                <input
                  class="segmented"
                  type="radio"
                  name={props.name}
                  value={item[fieldName.value]}
                  disabled={readOnly}
                  checked={item[fieldName.value] === value()}
                  onChange={handleChange}
                />
                <label
                  class={cx('label', item.class)}
                  tabindex={readOnly ? -1 : 0}
                  onKeyUp={({ key }) => {
                    onKeyUp(key, item);
                  }}
                  onClick={handleChange}
                  aria-disabled={readOnly}
                  ref={options()[i()].ref}
                >
                  <Show when={item[fieldName.icon]}>
                    <span class="icon">{item[fieldName.icon] as JSXElement}</span>
                  </Show>
                  <span class="text">{item[fieldName.label] as JSXElement}</span>
                  <Show when={item[fieldName.suffix]}>
                    <n-typography type="secondary">{item[fieldName.suffix]}</n-typography>
                  </Show>
                </label>
              </>
            );
          }}
        </For>
      </div>
    </>
  );
}

export type SegmentedElement = CustomElement<SegmentedProps>;

Segmented.registry = () => {
  Typography.registry();
  customElement<SegmentedProps>(
    'n-segmented',
    {
      class: void 0,
      css: void 0,
      name: void 0,
      disabled: void 0,
      value: void 0,
      defaultValue: void 0,
      options: [],
      onChange: void 0,
      fieldNames: void 0,
    },
    (_, opt) => {
      const el = opt.element;
      const props = mergeProps(
        {
          css: el.css,
          name: el.name,
          disabled: el.disabled,
          value: el.value,
          defaultValue: el.defaultValue,
          options: el.options,
          fieldNames: el.fieldNames,
          onChange(next: string) {
            el.dispatchEvent(
              new CustomEvent('change', {
                detail: next,
              }),
            );
          },
        },
        _,
      );

      createEffect(() => {
        clearAttribute(el, ['options', 'css', 'fieldNames']);
      });
      return (
        <>
          <style textContent={inline} />
          <Segmented {...props} />
        </>
      );
    },
  );
};
export default Segmented;
