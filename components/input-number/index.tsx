import {
  createComponent,
  createEffect,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
} from 'solid-js';
import { passiveSupported } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import Input, { type InputProps, defaultInportProps } from '../input';
import type { CustomElement } from '..';

const style = css`
  /** 隐藏原生加减控件 */
  .number[type='number'] {
    appearance: textfield;
  }

  .number[type='number']::-webkit-inner-spin-button,
  .number[type='number']::-webkit-outer-spin-button {
    appearance: none;
  }
`;

export interface InputNumberProps extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value?: number) => void;
  /** 每次改变步数，可以为小数 */
  step?: number;
  /** 数值精度 */
  precision?: number;
}
export type InputNumberElement = CustomElement<InputNumberProps>;

function InputNumber(props: InputNumberProps) {
  const [move, setMove] = createSignal(false);

  function onMouseDown(e: MouseEvent) {
    e.stopPropagation();
    setMove(true);
  }
  function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp':
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        mouseMove({ movementX: 0, movementY: -1 });
        break;
      case 'ArrowDown':
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        mouseMove({ movementX: 0, movementY: 1 });
        break;
      default:
        break;
    }
  }
  function mouseUp() {
    setMove(false);
  }
  const _ = mergeProps(
    {
      size: 'normal',
      value: '',
      defaultValue: 0,
      type: 'text',
      onKeyDown: onKeyDown,
      onMouseDown: onMouseDown,
      step: 1,
      precision: 2,
      max: Number.MAX_SAFE_INTEGER,
      min: Number.MIN_SAFE_INTEGER,
    },
    props,
    {
      // eslint-disable-next-line solid/reactivity
      class: cx('number', props.class),
      // eslint-disable-next-line solid/reactivity
      css: style + (props.css || ''),
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      onChange: change,
    },
  );

  function change(val?: string | number) {
    let _val = typeof val === 'string' ? parseFloat(val) : val;

    if (isNaN(_val as number)) {
      _val = '' as unknown as number;
    }
    if (typeof _val !== 'undefined') {
      if (_val < (_.min as number)) _val = _.min;
      if ((_val as number) > (_.max as number)) _val = _.max;
    }
    props.onChange?.(_val);
  }

  function mouseMove({ movementX, movementY }: { movementX: number; movementY: number }) {
    const _val = _.value;
    const val = typeof _val === 'number' && !isNaN(_val) ? _val : Number(_val) || 0;

    change(Number(Number(val + (movementX - movementY) * (_.step as number)).toFixed(_.precision)));
  }

  createEffect(() => {
    if (move()) {
      document.body.addEventListener('mousemove', mouseMove, passiveSupported);
    } else {
      document.body.removeEventListener('mousemove', mouseMove, passiveSupported);
    }
  });
  onMount(() => {
    document.body.addEventListener('mouseup', mouseUp, passiveSupported);
  });
  onCleanup(() => {
    document.body.removeEventListener('mouseup', mouseUp, passiveSupported);
  });

  return createComponent(Input, _ as InputProps);
}

customElement(
  'n-input-number',
  {
    ...defaultInportProps,
    defaultValue: undefined,
    max: undefined,
    min: undefined,
    onChange: undefined,
    step: undefined,
    precision: undefined,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        onChange(val?: number | string) {
          el.value = val;
          el.dispatchEvent(
            new CustomEvent('change', {
              detail: val,
            }),
          );
        },
      },
      _,
    );

    return createComponent(InputNumber, props);
  },
);

export default InputNumber;
