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
  /**
   * 亮度
   * @since 2.12.3
   */
  brightness?: number;
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
    'brightness',
  ]);
  const id = createUniqueId();
  const baseCss = createMemo(() => {
    const normal = cx(
      !!local.brightness && `brightness(${local.brightness})`,
      !!local.filterBlur && `blur(${local.filterBlur}px)`,
    );

    return css`
      #backdrop-slot {
        display: block;
        overflow: inherit;
        border-radius: inherit;
        inline-size: 100%;
        block-size: 100%;
        backdrop-filter: ${normal};
      }

      @supports (backdrop-filter: url(#${id})) {
        #backdrop-slot {
          backdrop-filter: ${normal} url(#${id});
        }
      }
    `;
  });

  return (
    <>
      <style textContent={baseCss()} />
      <Show when={props.css}>
        <style textContent={css(local.css)} />
      </Show>
      <slot id="backdrop-slot" />
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
      brightness: void 0,
      filterBlur: void 0,
      filter: void 0,
      feTurbulence: void 0,
      feDisplacementMap: void 0,
    },
    (props, opt) => {
      const el = opt.element;

      createEffect(() => {
        clearAttribute(el, [
          'css',
          'brightness',
          'filterBlur',
          'filter',
          'feTurbulence',
          'feDisplacementMap',
        ]);
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
