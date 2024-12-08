import { createEffect, createMemo, createSignal, mergeProps, splitProps, untrack } from 'solid-js';
import { customElement } from 'solid-element';

import type { CustomElement, InputElement, PopoverProps } from '..';
import { clearAttribute } from '../basic-config';
import Popover, { defaultProps } from '../popover';
import { inline } from '../theme';

import dayjs from './dayjs';
import Panel from './panel';
import { styles } from './style';

import '../button';
import '../menu';

function DatePicker(_props: DatePickerProps) {
  let ref: InputElement | undefined;
  const props = mergeProps(
    {
      type: 'date' as DatePickerProps['type'],
      parser: 'YYYY-MM-DD HH:mm:ss',
    },
    _props,
  );
  const [local, other] = splitProps(props, [
    'class',
    'css',
    'value',
    'defaultValue',
    'onChange',
    'type',
    'content',
    'onOpenChange',
    'open',
    'format',
    'popupCss',
    'trigger',
    'parser',
    'showTime',
    'showHour',
    'showMinute',
    'showSecond',
    'prefixIcon',
    'suffixIcon',
    'placeholder',
    'showToday',
    'showHeader',
  ]);
  const [open, setOpen] = createSignal<boolean | null>(null);
  const [current, setCurrent] = createSignal(dayjs(local.defaultValue));

  const format = createMemo(() => {
    if (local.format) {
      return local.format;
    }
    if (local.showTime) return 'YYYY-MM-DD HH:mm:ss';
    return {
      month: 'YYYY-MM',
      date: 'YYYY-MM-DD',
      year: 'YYYY',
    }[local.type || 'date'];
  });

  function openChange(next: boolean | null) {
    if (!other.disabled) {
      local.onOpenChange?.(next);
      if (local.open === void 0) {
        setOpen(next);
      }
    }
  }

  function focus(e: FocusEvent | MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    openChange(true);
  }
  function blur() {
    if (untrack(open)) {
      openChange(false);
    }
  }
  function inputMouseDown(e: MouseEvent) {
    if (e.target === (ref?.shadowRoot as ShadowRoot | null)?.activeElement) {
      openChange(!untrack(open));
    }
  }
  function handleChange(next: dayjs.Dayjs) {
    if (local.value === void 0) {
      setCurrent(next);
    }
    props.onChange?.(next.format(local.parser), next);
  }
  function handleInputChange(e: CustomEvent<string | number | undefined>) {
    if (e.detail) {
      const next = dayjs(e.detail);

      if (next.isValid()) {
        handleChange(next);
      }
    }
  }

  createEffect(() => {
    if (local.open !== void 0 && local.open !== untrack(open)) {
      setOpen(local.open);
    }
  });
  createEffect(() => {
    const next = dayjs(local.value || local.defaultValue);

    if (local.value !== void 0 && next.isValid()) {
      setCurrent(next);
    }
  });
  return (
    <Popover
      trigger="none"
      placement="left"
      open={open()}
      onOpenChange={openChange}
      css={local.css}
      popupCss={styles}
      content={
        <Panel
          type={local.type}
          current={current()}
          open={open()}
          onChange={handleChange}
          openChange={openChange}
          showHour={local.showHour}
          showMinute={local.showMinute}
          showSecond={local.showSecond}
          showTime={local.showTime}
          showToday={local.showToday}
          showHeader={local.showHeader}
        />
      }
      {...other}
    >
      <n-input
        ref={ref}
        onMouseDown={inputMouseDown}
        onFocus={focus}
        onBlur={blur}
        disabled={other.disabled}
        value={current().format(format())}
        suffix-icon={local.suffixIcon}
        prefix-icon={local.prefixIcon}
        placeholder={local.placeholder}
        part="value"
        onChange={handleInputChange}
      />
    </Popover>
  );
}
/** API
 * @since 2.1.0
 */
export interface DatePickerProps extends Partial<PopoverProps> {
  /** 自定义类名 */
  class?: string;
  /** 自定义类名 */
  css?: string;
  /** 类型
   * @default 'date'
   */
  type?: keyof typeof PickerType;
  /** 值 */
  value?: string | number;
  /** 默认值
   * @default 当前时间
   */
  defaultValue?: string | number;
  /** 禁用 */
  disabled?: boolean;
  /** 格式化回填到输入框的内容
   * @default 'YYYY-MM-DD'
   */
  format?: string;
  /** 格式化获取的值
   * @default 'YYYY-MM-DD HH:mm:ss'
   */
  parser?: string;
  /** 前缀 */
  prefixIcon?: JSX.Element;
  /** 后缀
   * @default '📅'
   */
  suffixIcon?: JSX.Element;
  /** 变更时的回调 */
  onChange?(val: string, time: dayjs.Dayjs): void;
  /** 显示时间选择
   * @default false
   */
  showTime?: boolean;
  /** 显示小时选择
   * @default true
   **/
  showHour?: boolean;
  /** 显示分钟选择
   * @default true
   **/
  showMinute?: boolean;
  /** 显示秒选择
   * @default true
   **/
  showSecond?: boolean;
  /** 占位文本 */
  placeholder?: string;
  /** 显示今日按钮
   * @default true
   */
  showToday?: boolean;
  /** 显示顶部
   * @default true
   */
  showHeader?: boolean;
}

export enum PickerType {
  /** 日期选择 */
  date = 'date',
  /** 月份选择 */
  month = 'month',
  /** 年份选择 */
  year = 'year',
}

export type DatePickerElement = CustomElement<DatePickerProps, 'onChange' | 'onOpenChange'>;

customElement<DatePickerProps>(
  'n-data-picker',
  {
    ...defaultProps,
    value: void 0,
    defaultValue: void 0,
    disabled: void 0,
    onChange: void 0,
    open: void 0,
    onOpenChange: void 0,
    type: void 0,
    format: void 0,
    parser: void 0,
    showTime: void 0,
    suffixIcon: '📅',
    prefixIcon: void 0,
    placeholder: void 0,
    showHour: true,
    showMinute: true,
    showSecond: true,
    showToday: true,
    showHeader: true,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        css: el.css,
        onChange(val: string, time: dayjs.Dayjs) {
          el.dispatchEvent(
            new CustomEvent('change', {
              detail: [val, time],
            }),
          );
        },
        onOpenChange(open: boolean | null) {
          el.dispatchEvent(
            new CustomEvent('openchange', {
              detail: open,
            }),
          );
        },
      },
      _,
    );

    createEffect(() => {
      clearAttribute(el, ['popupCss', 'css']);
    });
    return (
      <>
        <style textContent={inline} />
        <DatePicker {...props} />
      </>
    );
  },
);
export default DatePicker;
