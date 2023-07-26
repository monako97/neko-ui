import { type JSX, createComponent, mergeProps, splitProps } from 'solid-js';
import { customElement } from 'solid-element';
import type { CustomElement, TabOption } from '../index';

export interface CronProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 值 */
  value?: string;
  /** 默认值
   * @default '0 0 0 * * ? *'
   */
  defaultValue?: string;
  /** 值改变触发a */
  onChange?(val?: string): void;
  /** 是否隐藏 从*开始到*每*执行一次 */
  hiddenBegin?: boolean;
  /** 是否显示 crontab 表达式 input
   * @default true
   */
  showCrontab?: boolean;
  /** 隐藏域 */
  exclude?: string[];
  /** 标签页类型
   * @default 'line'
   */
  type: 'line' | 'card';
}

export type CronElement = CustomElement<CronProps>;

function Second() {
  return <>Second</>;
}
function Minute() {
  return <>Minute</>;
}
function Week() {
  return <>Week</>;
}
function Hour() {
  return <>Hour</>;
}
function Month() {
  return <>Month</>;
}
function Day() {
  return <>Day</>;
}
function Year() {
  return <>Year</>;
}
function Cron(props: CronProps) {
  const [local, other] = splitProps(props, [
    'value',
    'defaultValue',
    'exclude',
    'hiddenBegin',
    'showCrontab',
    'onChange',
  ]);
  const items: TabOption[] = [
    {
      key: 'second',
      label: '秒',
      content: Second,
    },
    {
      key: 'minute',
      label: '分钟',
      content: Minute,
    },
    {
      key: 'hour',
      label: '小时',
      content: Hour,
    },
    {
      key: 'day',
      label: '日',
      content: Day,
    },
    {
      key: 'week',
      label: '周',
      content: Week,
    },
    {
      key: 'month',
      label: '月',
      content: Month,
    },
    {
      key: 'year',
      label: '年',
      content: Year,
    },
  ];

  return (
    <div {...other}>
      <n-tabs type="card" items={items} />
      <n-input default-value={local.value || local.defaultValue} />
    </div>
  );
}

customElement(
  'n-cron',
  {
    value: undefined,
    defaultValue: '0 0 0 * * ? *',
    onChange: undefined,
    hiddenBegin: false,
    showCrontab: true,
    type: 'line',
    exclude: [],
  } as CronProps,
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
      },
      _,
    );

    return createComponent(Cron, props);
  },
);
export default Cron;
