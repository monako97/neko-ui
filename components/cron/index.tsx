import { type JSX, createComponent, mergeProps, splitProps } from 'solid-js';
import { customElement } from 'solid-element';
import type { CustomElement } from '../index';

export interface CronProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /* 值 */
  value?: string;
  /* 默认值 */
  defaultValue?: string;
  /* 值改变触发 */
  // eslint-disable-next-line no-unused-vars
  onChange(val?: string): void;
  /* 是否隐藏 从*开始到*每*执行一次 */
  hiddenBegin?: boolean;
  /** 是否显示 crontab 表达式 input
   * @default true
   * @since 2.0.0
   */
  showCrontab?: boolean;
  /* 隐藏域 */
  exclude?: string[];
}

export type CronElement = CustomElement<CronProps>;

function Cron(props: CronProps) {
  const [local, other] = splitProps(props, [
    'value',
    'defaultValue',
    'exclude',
    'hiddenBegin',
    'showCrontab',
    'onChange',
  ]);

  return <div {...other}>{local.value || local.defaultValue}</div>;
}

customElement(
  'n-cron',
  {
    value: undefined,
    defaultValue: '0 0 0 * * ? *',
    onChange: undefined,
    hiddenBegin: false,
    showCrontab: true,
    exclude: [],
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
      },
      _,
    );

    return createComponent(Cron, props);
  },
);
export default Cron;
