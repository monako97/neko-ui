import { For, Match, Show, Switch, createEffect, createMemo, createSignal } from 'solid-js';
import { cx } from '@moneko/css';
import DatePanel from './date';
import dayjs from './dayjs';
import MonthPanel from './month';
import TimePicker from './time';
import YearPanel from './year';
import type { DatePickerProps } from '.';

type PanelProps = {
  current: dayjs.Dayjs;
  type?: DatePickerProps['type'];
  onChange(val: dayjs.Dayjs): void;
  open: boolean | null;
  openChange(val: boolean | null): void;
  showHour?: boolean;
  showMinute?: boolean;
  showSecond?: boolean;
  showTime?: boolean;
  showToday?: boolean;
  showHeader?: boolean;
};

function preventDefault(e: Event) {
  e.stopPropagation();
  e.preventDefault();
}

function Panel(props: PanelProps) {
  let datePicker: HTMLDivElement | undefined;
  const [offset, setOffset] = createSignal(0);
  const [type, setType] = createSignal<DatePickerProps['type']>('date');

  const weekdays = dayjs.weekdaysMin();
  const isDate = createMemo(() => type() === 'date');
  const startYear = createMemo(
    () => parseInt(`${props.current.get('years') / 10 + offset()}`) * 10,
  );

  function handleMouseDown(e: MouseEvent) {
    if (props.open) {
      preventDefault(e);
    }
  }
  function setPrevYear() {
    if (type() === 'year') {
      setOffset((prev) => prev - 1);
    } else {
      props.onChange(props.current.subtract(1, 'year'));
    }
  }
  function setNextYear() {
    if (type() === 'year') {
      setOffset((prev) => prev + 1);
    } else {
      props.onChange(props.current.subtract(-1, 'year'));
    }
  }
  function setPrevMonth() {
    props.onChange(props.current.subtract(1, 'month'));
  }
  function setNextMonth() {
    props.onChange(props.current.subtract(-1, 'month'));
  }
  function handleChange(next: dayjs.Dayjs) {
    props.onChange(next);
    if (type() === props.type) {
      props.openChange(false);
    } else {
      setType(props.type);
    }
  }
  createEffect(() => {
    if (type() !== 'year') {
      setOffset((prev) => {
        if (prev) return 0;
        return prev;
      });
    }
  });

  createEffect(() => {
    if (props.type) {
      setType(props.type);
    }
  });
  return (
    <div class="date-time-picker">
      <div ref={datePicker} class="date-picker" onMouseDown={handleMouseDown}>
        <Show when={props.showHeader}>
          <section class="date-picker-header">
            <span class={cx('date-prev', !isDate() && 'not-date')}>
              <n-button
                class="prev-year"
                type="primary"
                circle={true}
                flat={true}
                onClick={setPrevYear}
              >
                《
              </n-button>
              <Show when={isDate()}>
                <n-button
                  class="prev-month"
                  type="primary"
                  circle={true}
                  flat={true}
                  onClick={setPrevMonth}
                >
                  〈
                </n-button>
              </Show>
            </span>
            <span class="date-value">
              <n-button ghost={true} flat={true} onClick={() => setType('year')}>
                <strong>
                  <Show when={type() === 'year'} fallback={`${props.current.get('years')}年`}>
                    {`${startYear()}-${startYear() + 9}年`}
                  </Show>
                </strong>
              </n-button>
              <Show when={isDate()}>
                <n-button ghost={true} flat={true} onClick={() => setType('month')}>
                  <strong>{`${props.current.get('months') + 1}月`}</strong>
                </n-button>
              </Show>
            </span>
            <span class={cx('date-next', !isDate() && 'not-date')}>
              <Show when={isDate()}>
                <n-button
                  class="next-month"
                  type="primary"
                  circle={true}
                  flat={true}
                  onClick={setNextMonth}
                >
                  〉
                </n-button>
              </Show>
              <n-button
                class="next-year"
                type="primary"
                circle={true}
                flat={true}
                onClick={setNextYear}
              >
                》
              </n-button>
            </span>
          </section>
        </Show>
        <Show when={isDate()}>
          <section class="date-picker-weeks">
            <For each={weekdays}>{(e) => <span>{e}</span>}</For>
          </section>
        </Show>
        <section class="date-picker-items">
          <Switch>
            <Match when={isDate()}>
              <DatePanel current={props.current} onChange={handleChange} />
            </Match>
            <Match when={type() === 'month'}>
              <MonthPanel current={props.current} onChange={handleChange} />
            </Match>
            <Match when={type() === 'year'}>
              <YearPanel current={props.current} onChange={handleChange} start={startYear()} />
            </Match>
          </Switch>
        </section>
        <Show when={isDate() && props.showToday}>
          <section class="date-picker-footer">
            <n-button
              type="primary"
              block={true}
              link={true}
              onClick={() => props.onChange(dayjs())}
            >
              今日
            </n-button>
          </section>
        </Show>
      </div>
      <Show when={isDate() && props.showTime}>
        <TimePicker
          current={props.current}
          onChange={props.onChange}
          showHour={props.showHour}
          showMinute={props.showMinute}
          showSecond={props.showSecond}
          datePicker={datePicker}
        />
      </Show>
    </div>
  );
}

export default Panel;
