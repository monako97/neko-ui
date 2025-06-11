import {
  createEffect,
  createMemo,
  createUniqueId,
  JSX,
  mergeProps,
  Show,
  splitProps,
} from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import { clearAttribute, type JSXElement } from '../basic-config';
import { inline } from '../theme';

export interface GlassPanelProps {
  /**
   * 子元素
   */
  children?: JSXElement;
  /**
   * 样式
   */
  css?: string;
  /**
   * 类名
   */
  class?: string;
  /**
   * 模糊值 (px)
   * @default 16
   */
  filterBlur?: number;
  filter?: Omit<JSX.FilterSVGAttributes<SVGFilterElement>, 'id'>;
  feTurbulence?: JSX.FeTurbulanceSVGAttributes<SVGFETurbulenceElement>;
  feDisplacementMap?: JSX.FeDisplacementMapSVGAttributes<SVGFEDisplacementMapElement>;
}

const GlassPanel = (_: GlassPanelProps) => {
  const props = mergeProps({ filterBlur: 16 }, _);
  const [local] = splitProps(props, [
    'css',
    'filter',
    'feTurbulence',
    'feDisplacementMap',
    'filterBlur',
  ]);
  const id = createUniqueId();
  const baseCss = css({
    '#backdrop-slot': {
      display: 'block',
      width: '100%',
      height: '100%',
      borderRadius: 'inherit',
      overflow: 'inherit',
    },
  });
  const filter = createMemo(() =>
    cx(!!local.filterBlur && `blur(${local.filterBlur}px)`, `url(#${id})`),
  );

  return (
    <>
      <style textContent={baseCss} />
      <Show when={props.css}>
        <style textContent={css(local.css)} />
      </Show>
      <slot
        id="backdrop-slot"
        style={css({
          '-webkit-backdrop-filter': filter(),
          'backdrop-filter': filter(),
        })}
      />
      <svg style={{ display: 'none' }}>
        <filter
          id={id}
          filterUnits="objectBoundingBox"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
          {...local.filter}
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.45"
            numOctaves="1"
            {...local.feTurbulence}
          />
          <feDisplacementMap in="SourceGraphic" scale="50" {...local.feDisplacementMap} />
        </filter>
      </svg>
    </>
  );
};

export type GlassPanelElement = CustomElement<GlassPanelProps>;

GlassPanel.registry = () => {
  customElement<GlassPanelProps>(
    'n-glass-panel',
    {
      class: void 0,
      css: void 0,
      filterBlur: void 0,
      filter: void 0,
      feTurbulence: void 0,
      feDisplacementMap: void 0,
    },
    (props, opt) => {
      const el = opt.element;

      createEffect(() => {
        clearAttribute(el, ['css', 'filterBlur', 'filter', 'feTurbulence', 'feDisplacementMap']);
      });
      return (
        <>
          <style textContent={inline} />
          <GlassPanel {...props} />
        </>
      );
    },
  );
};

export default GlassPanel;
