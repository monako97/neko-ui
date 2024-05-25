import { Show, batch, createEffect, createSignal, mergeProps, splitProps, untrack } from 'solid-js';
import { css } from '@moneko/css';
import { customElement } from 'solid-element';
import Day from './day';
import Hour from './hour';
import Minute from './minute';
import Month from './month';
import Second from './second';
import Week from './week';
import Year from './year';
import '../button';
import '../input-number';
import '../radio';
import '../select';
import '../tabs';
import type { BaseOption, CustomElement, TabOption } from '..';

export interface CronProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 隐藏域 */
  exclude?: string[];
  /** 显示表达式
   * @default true
   */
  showCron?: boolean;
  /** 标签页类型
   * @default 'line'
   */
  type?: 'line' | 'card';
  /** 值 */
  value?: string;
  /** 默认值
   * @default 0 0 0 * * ? *
   */
  defaultValue?: string;
  /** 值改变触发a */
  onChange?(val?: string): void;
}

export type CronElement = CustomElement<CronProps>;
export type SecondType = '*' | 'period' | 'beginInterval' | 'some';
export type MinuteType = SecondType;
export type HourType = SecondType;
export type DayType = SecondType | 'closeWorkDay' | '?' | 'last';
export type WeekType = SecondType | 'last' | '?';
export type MonthType = SecondType;
export type YearType = SecondType | '';
export type CronData<T extends string = string> = {
  start: number;
  end: number;
  begin: number;
  beginEvery: number;
  type: T;
  some: number[];
  value: string;
};

export type ActiveTab = keyof CronType;
export type CronType = {
  second: CronData<SecondType>;
  minute: CronData<MinuteType>;
  hour: CronData<HourType>;
  day: CronData<DayType> & { last: number; closeWorkDay: number };
  week: CronData<WeekType> & { last: number };
  month: CronData<MonthType>;
  year: CronData<YearType>;
};

function Cron(props: CronProps) {
  const [local] = splitProps(props, [
    'value',
    'defaultValue',
    'exclude',
    'onChange',
    'type',
    'showCron',
    'css',
    'class',
  ]);
  const [value, setValue] = createSignal(local.defaultValue);
  const date = new Date();
  const fullYear = date.getFullYear();
  const defaultState = {
    hms: {
      start: 0,
      end: 1,
      begin: 0,
      beginEvery: 1,
      some: [0],
      value: '',
    },
    mwd: {
      start: 1,
      end: 2,
      begin: 1,
      beginEvery: 1,
      some: [1],
      value: '',
    },
    year: {
      start: fullYear,
      end: fullYear + 1,
      begin: fullYear,
      beginEvery: 1,
      some: [fullYear],
      value: '',
    },
  };
  const days: BaseOption[] = [];
  const daysBeginEvery: number[] = [];

  for (let x = 1; x < 32; x++) {
    days.push({
      label: x < 10 ? `0${x}` : `${x}`,
      value: x,
    });
    daysBeginEvery.push(x);
  }
  const [active, setActive] = createSignal<ActiveTab>('second');
  const [state, setState] = createSignal<CronType>({
    second: { type: '*', ...defaultState.hms },
    minute: { type: '*', ...defaultState.hms },
    hour: { type: '*', ...defaultState.hms },
    day: {
      type: '*',
      last: 1,
      closeWorkDay: 1,
      ...defaultState.mwd,
    },
    month: {
      type: '*',
      ...defaultState.mwd,
    },
    week: {
      last: 1,
      type: '?',
      ...defaultState.mwd,
    },
    year: {
      type: '',
      ...defaultState.year,
    },
  });

  function prefixWeekDay() {
    const store = untrack(state);
    const isDay = active() === 'day';

    if (isDay || active() === 'week') {
      const key = isDay ? 'week' : 'day';
      const next = store[key].type === '?' && store[active()].type === '?' ? '*' : '?';

      if (next !== store[key].type) {
        setState((prev) => {
          return {
            ...prev,
            [key]: {
              ...prev[key],
              type: next,
            },
          };
        });
      }
    }
  }

  function onChange<T extends CronType[ActiveTab]>(type: keyof T, val: T[keyof T]) {
    batch(() => {
      prefixWeekDay();
      setState((prev) => {
        const next = {
          ...prev[active()],
          [type]: val,
        };

        if (type === 'start' || type === 'end') {
          if (next.end - next.start <= 1) {
            if (type === 'end') {
              next.start = (val as number) - 1;
            } else {
              next.end = (val as number) + 1;
            }
          }
        }

        return {
          ...prev,
          [active()]: next,
        };
      });
    });
  }
  function changeActiveKey(e: CustomEvent<[string, TabOption, Event]>) {
    setActive(e.detail[0] as ActiveTab);
  }
  function parseVal<T extends ActiveTab>(item: CronType[T], isWeek?: boolean) {
    if (item.value.includes('-')) {
      item.type = 'period';
      const period = item.value.split('-');

      item.start = Number(period[0]);
      item.end = Number(period[1]);
    } else if (item.value.includes('W')) {
      item.type = 'closeWorkDay';
      (item as CronType['day']).closeWorkDay = Number(item.value.split('W')[0]) || 1;
    } else if (item.value.includes('L')) {
      item.type = 'last';
      (item as CronType['day']).last = Number(item.value.split('L')[0]) || 1;
    } else if (item.value.includes(isWeek ? '#' : '/')) {
      item.type = 'beginInterval';
      const beginInterval = item.value.split(isWeek ? '#' : '/');

      if (isWeek) {
        item.begin = Number(beginInterval[1]);
        item.beginEvery = Number(beginInterval[0]);
      } else {
        item.begin = Number(beginInterval[0]);
        item.beginEvery = Number(beginInterval[1]);
      }
    } else if (item.value.includes(',') || /^[0-9]+$/.test(item.value)) {
      item.type = 'some';
      item.some = item.value.split(',').map(Number);
    } else {
      item.type = item.value as CronType[T]['type'];
    }
    return item;
  }

  function nts(num?: string | number) {
    if (typeof num === 'number' && !isNaN(num)) {
      return `${num}`;
    }
    return num;
  }

  function fmt<T extends ActiveTab>(item: CronType[T], isWeek?: boolean) {
    switch (item.type) {
      case 'period':
        return `${nts(item.start)}-${nts(item.end)}`;
      case 'beginInterval':
        if (isWeek) return `${nts(item.beginEvery)}#${nts(item.begin)}`;
        return `${nts(item.begin)}/${nts(item.beginEvery)}`;
      case 'closeWorkDay':
        return `${nts(item.closeWorkDay || 1)}W`;
      case 'last':
        return isWeek ? `${nts(item.last)}L` : 'L';
      case 'some':
        return item.some.join(',');
      default:
        return item.type;
    }
  }

  createEffect(() => {
    if (local.value !== void 0 && untrack(value) !== local.value) {
      setValue(local.value);
    }
  });

  createEffect(() => {
    const val = value();

    if (val) {
      const valuesArray = val.toUpperCase().split(' ');

      batch(() => {
        setState((prev) => {
          return {
            second: parseVal<'second'>({ ...prev.second, value: valuesArray[0] || '?' }),
            minute: parseVal<'minute'>({ ...prev.minute, value: valuesArray[1] || '?' }),
            hour: parseVal<'hour'>({ ...prev.hour, value: valuesArray[2] || '?' }),
            day: parseVal<'day'>({ ...prev.day, value: valuesArray[3] || '' }),
            month: parseVal<'month'>({ ...prev.month, value: valuesArray[4] || '' }),
            week: parseVal<'week'>({ ...prev.week, value: valuesArray[5] || '' }, true),
            year: parseVal<'year'>({ ...prev.year, value: valuesArray[6] || '' }),
          };
        });
      });
    }
  });
  createEffect(() => {
    const { second, minute, hour, day, month, week, year } = state();
    const next = `${fmt(second)} ${fmt(minute)} ${fmt(hour)} ${fmt(day)} ${fmt(month)} ${fmt(
      week,
      true,
    )} ${fmt(year)}`;

    setValue((prev) => {
      if (prev === next) return prev;
      props.onChange?.(next);
      return next;
    });
  });

  const items = [
    {
      value: 'second',
      label: '秒',
      content: <Second state={state().second} onChange={onChange} />,
    },
    {
      value: 'minute',
      label: '分钟',
      content: <Minute state={state().minute} onChange={onChange} />,
    },
    {
      value: 'hour',
      label: '小时',
      content: <Hour state={state().hour} onChange={onChange} />,
    },
    {
      value: 'day',
      label: '日',
      content: <Day state={state().day} onChange={onChange} />,
    },
    {
      value: 'week',
      label: '周',
      content: <Week state={state().week} onChange={onChange} />,
    },
    {
      value: 'month',
      label: '月',
      content: <Month state={state().month} onChange={onChange} />,
    },
    {
      value: 'year',
      label: '年',
      content: <Year state={state().year} onChange={onChange} />,
    },
  ];

  return (
    <>
      <Show when={local.css}>
        <style textContent={css(local.css)} />
      </Show>
      <n-tabs type={local.type} items={items} value={active()} onChange={changeActiveKey} />
      <Show when={local.showCron}>
        <code
          style={{
            width: '100%',
            display: 'block',
            background: 'var(--component-bg)',
            'border-radius': 'var(--border-radius)',
            'text-align': 'center',
          }}
        >
          {value()}
        </code>
      </Show>
    </>
  );
}

customElement<CronProps>(
  'n-cron',
  {
    value: void 0,
    defaultValue: '0 0 0 * * ? *',
    onChange: void 0,
    type: 'line',
    exclude: [],
    showCron: true,
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

    return <Cron {...props} />;
  },
);
export default Cron;
