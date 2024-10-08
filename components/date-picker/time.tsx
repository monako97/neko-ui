import { createEffect, createSignal, Show } from 'solid-js';

import dayjs from './dayjs';

interface TimePickerProps {
  current: dayjs.Dayjs;
  datePicker: HTMLDivElement | undefined;
  onChange(next: dayjs.Dayjs): void;
  showHour?: boolean;
  showMinute?: boolean;
  showSecond?: boolean;
}

export const hours = Array.from({ length: 24 }, (_, i) => ({
  label: i < 10 ? `0${i}` : i,
  value: i,
}));
export const minutes = Array.from({ length: 60 }, (_, i) => ({
  label: i < 10 ? `0${i}` : i,
  value: i,
}));

function TimePicker(props: TimePickerProps) {
  const [hei, setHei] = createSignal('0px');

  createEffect(() => {
    setHei(`${props.datePicker?.offsetHeight}px`);
  });

  return (
    <section class="time-picker" style={{ 'max-block-size': hei() }}>
      <section class="time-picker-header">
        <n-button ghost={true} flat={true}>
          <strong>{props.current.format('HH:mm:ss')}</strong>
        </n-button>
      </section>
      <section class="time-picker-items">
        <Show when={props.showHour}>
          <n-menu
            items={hours}
            value={props.current.get('hour')}
            onChange={(e) => {
              const next = props.current.set('hour', e.detail[0] as number);

              props.onChange(next);
            }}
          />
        </Show>
        <Show when={props.showMinute}>
          <n-menu
            items={minutes}
            value={props.current.get('minute')}
            onChange={(e) => {
              const next = props.current.set('minute', e.detail[0] as number);

              props.onChange(next);
            }}
          />
        </Show>
        <Show when={props.showSecond}>
          <n-menu
            items={minutes}
            value={props.current.get('second')}
            onChange={(e) => {
              const next = props.current.set('second', e.detail[0] as number);

              props.onChange(next);
            }}
          />
        </Show>
      </section>
    </section>
  );
}

export default TimePicker;
