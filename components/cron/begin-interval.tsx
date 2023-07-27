import type { JSXElement } from 'solid-js';
import { selectCss, selectPortalCss } from './style';
import type { CronData } from '.';
import type { BaseOption } from 'neko-ui';

type BeginIntervalProps = {
  begin: CronData['begin'];
  beginEvery: CronData['beginEvery'];
  label: [JSXElement, JSXElement, JSXElement];
  beginOption: (string | number | BaseOption)[];
  beginEveryOption: (string | number | BaseOption)[];
  onChange(type: 'begin' | 'beginEvery', value: number): void;
  validate(type: 'begin' | 'beginEvery', value: number): boolean;
  disabled: boolean;
};

function BeginInterval(props: BeginIntervalProps) {
  function onChange(
    type: 'begin' | 'beginEvery',
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
        value={props.begin}
        onChange={onChange.bind(null, 'begin')}
        options={props.beginOption}
        disabled={props.disabled}
        css={selectCss}
        popup-css={selectPortalCss}
        dropdown-match-select-width={false}
        arrow={true}
      />
      {props.label[1]}
      <n-select
        value={props.beginEvery}
        onChange={onChange.bind(null, 'beginEvery')}
        options={props.beginEveryOption}
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

export default BeginInterval;
