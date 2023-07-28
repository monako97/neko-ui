import {
  type JSX,
  Show,
  batch,
  createComponent,
  createEffect,
  createSignal,
  mergeProps,
  splitProps,
  untrack,
} from 'solid-js';
import { customElement } from 'solid-element';
import { createStore } from 'solid-js/store';
import Day from './day';
import Hour from './hour';
import Minute from './minute';
import Month from './month';
import Second from './second';
import Week from './week';
import Year from './year';
import type { BaseOption } from '../index';

export interface CronProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
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

export type CronType = {
  activeKey: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
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
  const [store, setStore] = createStore<CronType>({
    activeKey: 'second',
    year: {
      type: '',
      ...defaultState.year,
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
    day: {
      type: '*',
      last: 1,
      closeWorkDay: 1,
      ...defaultState.mwd,
    },
    hour: { type: '*', ...defaultState.hms },
    minute: { type: '*', ...defaultState.hms },
    second: { type: '*', ...defaultState.hms },
  });

  function prefixWeekDay() {
    const isDay = store.activeKey === 'day';

    if (isDay || store.activeKey === 'week') {
      const key = isDay ? 'week' : 'day';
      const next = store[key].type === '?' && store[store.activeKey].type === '?' ? '*' : '?';

      if (next !== store[key].type) {
        setStore(key, (p) => ({
          ...p,
          type: next,
        }));
      }
    }
  }
  function onType<T extends CronType['activeKey']>(type: CronType[T]['type']) {
    batch(() => {
      prefixWeekDay();
      setStore(store.activeKey as T, (prev) => {
        return {
          ...prev,
          type: type,
        };
      });
    });
  }

  function onChange<T extends CronType[CronType['activeKey']]>(type: keyof T, val: T[keyof T]) {
    batch(() => {
      prefixWeekDay();
      setStore(store.activeKey, (prev) => {
        const state = {
          ...prev,
          [type]: val,
        };

        if (type === 'start' || type === 'end') {
          if (state.end - state.start <= 1) {
            if (type === 'end') {
              state.start = (val as number) - 1;
            } else {
              state.end = (val as number) + 1;
            }
          }
        }

        return state;
      });
    });
  }
  function changeActiveKey(e: CustomEvent<string>) {
    setStore('activeKey', e.detail as CronType['activeKey']);
  }
  function parseVal<T extends CronType['activeKey']>(_: CronType[T], isWeek?: boolean) {
    const item = { ..._ };

    if (item.value.indexOf('-') > -1) {
      item.type = 'period';
      const period = item.value.split('-');

      item.start = Number(period[0]);
      item.end = Number(period[1]);
    } else if (item.value.indexOf('W') > -1) {
      item.type = 'closeWorkDay';
      (item as CronType['day']).closeWorkDay = Number(item.value.split('W')[0]) || 1;
    } else if (item.value.indexOf('L') > -1) {
      item.type = 'last';
      (item as CronType['day']).last = Number(item.value.split('L')[0]) || 1;
    } else if (item.value.indexOf(isWeek ? '#' : '/') > -1) {
      item.type = 'beginInterval';
      const beginInterval = item.value.split(isWeek ? '#' : '/');

      if (isWeek) {
        item.begin = Number(beginInterval[1]);
        item.beginEvery = Number(beginInterval[0]);
      } else {
        item.begin = Number(beginInterval[0]);
        item.beginEvery = Number(beginInterval[1]);
      }
    } else if (item.value.indexOf(',') > -1 || /^[0-9]+$/.test(item.value)) {
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

  function culcValue<T extends CronType['activeKey']>(item: CronType[T]) {
    switch (item.type) {
      case 'period':
        return `${nts(item.start)}-${nts(item.end)}`;
      case 'beginInterval':
        return `${nts(item.begin)}/${nts(item.beginEvery)}`;
      case 'some':
        return item.some.join(',');
      default:
        return item.type;
    }
  }
  function culcDayValue<T extends CronType['activeKey']>(item: CronType[T]) {
    switch (item.type) {
      case 'period':
        return `${nts(item.start)}-${nts(item.end)}`;
      case 'beginInterval':
        return `${nts(item.begin)}/${nts(item.beginEvery)}`;
      case 'some':
        return item.some.join(',');
      case 'last':
        // day.value = n2s(day.last || 1) + "L";
        return 'L';
      case 'closeWorkDay':
        return `${nts(item.closeWorkDay || 1)}W`;
      default:
        return item.type;
    }
  }
  function culcWeekValue<T extends CronType['activeKey']>(item: CronType[T]) {
    switch (item.type) {
      case 'period':
        return `${nts(item.start)}-${nts(item.end)}`;
      case 'beginInterval':
        return `${nts(item.beginEvery)}#${nts(item.begin)}`;
      case 'last':
        return `${nts(item.last)}L`;
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
        setStore('second', (prev) => parseVal<'second'>({ ...prev, value: valuesArray[0] || '?' }));
        setStore('minute', (prev) => parseVal<'minute'>({ ...prev, value: valuesArray[1] || '?' }));
        setStore('hour', (prev) => parseVal<'hour'>({ ...prev, value: valuesArray[2] || '?' }));
        setStore('day', (prev) => parseVal<'day'>({ ...prev, value: valuesArray[3] || '' }));
        setStore('month', (prev) => parseVal<'month'>({ ...prev, value: valuesArray[4] || '' }));
        setStore('week', (prev) =>
          parseVal<'week'>({ ...prev, value: valuesArray[5] || '' }, true),
        );
        setStore('year', (prev) => parseVal<'year'>({ ...prev, value: valuesArray[6] || '' }));
      });
    }
  });
  createEffect(() => {
    const next = `${culcValue(store.second)} ${culcValue(store.minute)} ${culcValue(
      store.hour,
    )} ${culcDayValue(store.day)} ${culcValue(store.month)} ${culcWeekValue(
      store.week,
    )} ${culcValue(store.year)}`;

    if (untrack(value) !== next) {
      setValue(next);
    }
  });
  createEffect(() => {
    if (local.value !== value()) {
      props.onChange?.(value());
    }
  });

  const items = [
    {
      value: 'second',
      label: '秒',
      content: <Second state={store.second} onChange={onChange} onType={onType} />,
    },
    {
      value: 'minute',
      label: '分钟',
      content: <Minute state={store.minute} onChange={onChange} onType={onType} />,
    },
    {
      value: 'hour',
      label: '小时',
      content: <Hour state={store.hour} onChange={onChange} onType={onType} />,
    },
    {
      value: 'day',
      label: '日',
      content: <Day state={store.day} onChange={onChange} onType={onType} />,
    },
    {
      value: 'week',
      label: '周',
      content: <Week state={store.week} onChange={onChange} onType={onType} />,
    },
    {
      value: 'month',
      label: '月',
      content: <Month state={store.month} onChange={onChange} onType={onType} />,
    },
    {
      value: 'year',
      label: '年',
      content: <Year state={store.year} onChange={onChange} onType={onType} />,
    },
  ];

  return (
    <>
      <n-tabs type={local.type} items={items} value={store.activeKey} onChange={changeActiveKey} />
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

customElement(
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

    return createComponent(Cron, props);
  },
);
export default Cron;
