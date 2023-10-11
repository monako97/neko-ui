import { selectCss, selectPortalCss } from './style';
import type { CronData } from '.';
import type { BaseOption } from 'neko-ui';

type PeriodProps = {
  start: CronData['start'];
  end: CronData['end'];
  label: [JSX.Element, JSX.Element, JSX.Element];
  options: (string | number | BaseOption)[];
  onChange(type: 'start' | 'end', value: number): void;
  validate(type: 'start' | 'end', v: number): boolean;
  disabled: boolean;
};

function Period(props: PeriodProps) {
  function onChange(
    type: 'start' | 'end',
    e: CustomEvent<[val: number | string, item: BaseOption]>,
  ) {
    const [value] = e.detail;
    const v = Number(value);

    if (props.validate(type, v)) {
      props.onChange(type, v);
    }
  }

  return (
    <>
      {props.label[0]}
      <n-select
        value={props.start}
        onChange={onChange.bind(null, 'start')}
        options={props.options.slice(0, -1)}
        disabled={props.disabled}
        css={selectCss}
        popup-css={selectPortalCss}
        dropdown-match-select-width={false}
        arrow={true}
      />
      {props.label[1]}
      <n-select
        value={props.end}
        onChange={onChange.bind(null, 'end')}
        options={props.options.slice(1)}
        disabled={props.disabled}
        css={selectCss}
        popup-css={selectPortalCss}
        dropdown-match-select-width={false}
        arrow={true}
      />
      {props.label[2]}
    </>
  );
}

export default Period;
