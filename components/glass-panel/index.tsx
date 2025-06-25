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
   * 模糊值
   * @default 16
   */
  blur?: string;
  /**
   * 亮度
   * @since 2.12.3
   */
  brightness?: string;
  /**
   * 对比度
   * @since 2.12.5
   */
  contrast?: string;
  /**
   * 阴影
   * @since 2.12.5
   */
  dropShadow?: string;
  /**
   * 灰度
   * @since 2.12.5
   */
  grayscale?: string;
  /**
   * 色调旋转
   * @since 2.12.5
   */
  hueRotate?: string;
  /**
   * 反转颜色
   * @since 2.12.5
   */
  invert?: string;
  /**
   * 透明度
   * @since 2.12.5
   */
  opacity?: string;
  /**
   * 饱和度
   * @since 2.12.5
   */
  saturate?: string;
  /**
   * 复古效果
   * @since 2.12.5
   */
  sepia?: string;
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
    'blur',
    'brightness',
    'contrast',
    'dropShadow',
    'grayscale',
    'hueRotate',
    'invert',
    'opacity',
    'saturate',
    'sepia',
  ]);
  const id = createUniqueId();
  const baseCss = createMemo(() => {
    const normal = cx(
      !!local.brightness && `brightness(${local.brightness})`,
      !!local.blur && `blur(${local.blur})`,
      !!local.contrast && `contrast(${local.contrast})`,
      !!local.dropShadow && `drop-shadow(${local.dropShadow})`,
      !!local.grayscale && `grayscale(${local.grayscale})`,
      !!local.hueRotate && `hue-rotate(${local.hueRotate})`,
      !!local.invert && `invert(${local.invert})`,
      !!local.opacity && `opacity(${local.opacity})`,
      !!local.saturate && `saturate(${local.saturate})`,
      !!local.sepia && `sepia(${local.sepia})`,
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
      blur: void 0,
      contrast: void 0,
      dropShadow: void 0,
      grayscale: void 0,
      hueRotate: void 0,
      invert: void 0,
      opacity: void 0,
      saturate: void 0,
      sepia: void 0,
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
          'blur',
          'contrast',
          'dropShadow',
          'grayscale',
          'hueRotate',
          'invert',
          'opacity',
          'saturate',
          'sepia',
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
