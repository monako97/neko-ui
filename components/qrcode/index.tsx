import { createEffect, JSX, mergeProps, Show, splitProps } from 'solid-js';
import { customElement } from 'solid-element';

import { clearAttribute } from '../basic-config';
import theme, { inline } from '../theme';

import { Ecc, encodeSegments, type IntRange, makeSegments } from './qrcode';
export type { IntRange } from './qrcode';
export interface QrCodeProps {
  /** 自定义类名 */
  class?: string;
  style?: string | JSX.CSSProperties;
  /** 二维码值 */
  value: string;
  /** 二维码模块的颜色 */
  color?: string;
  /** 二维码背景色 */
  bgColor?: string;
  /**
   * 二维码尺寸
   * @default 150
   */
  size?: number;
  /** 纠错等级; 分别对应7%、15%、25%、30%的数据纠错能力
   * @default 'm'
   */
  ecl?: 'l' | 'm' | 'q' | 'h';
  minVersion?: IntRange<1, 41>;
  maxVersion?: IntRange<1, 41>;
  mask?: -1 | IntRange<0, 8>;
  boostEcc?: boolean;
  /**
   * 模块外围的边框宽度（模块单位，非像素）
   * @default 1
   */
  border?: IntRange<1, 101>;
  /**
   * 渲染方式
   * @default 'svg'
   */
  type?: 'svg' | 'canvas';
  /**
   * 二维码图标
   */
  icon?: string;
  /**
   * 二维码图标尺寸
   * @default 7
   */
  iconSize?: number;
  /**
   * 模块形状
   * @default 'rect'
   * @since 2.9.1
   */
  shape?: 'rect' | 'rhombus' | 'heart' | 'circle';
}
const QRCode = (_props: QrCodeProps) => {
  const { isDark } = theme;
  let cvs: HTMLCanvasElement | undefined;
  let svg: SVGSVGElement | undefined;
  let img: HTMLImageElement | undefined;
  const normal = mergeProps(
    {
      size: 160,
      iconSize: 7,
      border: 1,
      ecl: 'm' as const,
      type: 'svg' as const,
    },
    _props,
  );
  const [props, other] = splitProps(normal, [
    'value',
    'border',
    'size',
    'type',
    'minVersion',
    'maxVersion',
    'mask',
    'boostEcc',
    'ecl',
    'bgColor',
    'color',
    'iconSize',
    'shape',
  ]);
  const eccMap = {
    l: Ecc.get('LOW'),
    m: Ecc.get('MEDIUM'),
    q: Ecc.get('QUARTILE'),
    h: Ecc.get('HIGH'),
  };

  createEffect((prev?: { color?: string; bg?: string }) => {
    isDark(); // 响应主题模式
    const segs = makeSegments(props.value);
    const qr = encodeSegments(
      segs,
      eccMap[props.ecl],
      props.minVersion,
      props.maxVersion,
      props.mask,
      props.boostEcc,
    );
    let styles: CSSStyleDeclaration;

    if (props.type === 'canvas') {
      if (props.size <= 0 || props.border < 0 || !cvs) throw new RangeError('Value out of range');
      const scale = props.size / (qr.size + props.border * 2);
      const radius = scale / 2; // 半径

      cvs.width = props.size;
      cvs.height = props.size;
      styles = window.getComputedStyle(cvs as unknown as Element);
      const ctx = cvs.getContext('2d') as CanvasRenderingContext2D;
      const color = props.color || prev?.color || styles.color;
      const bgColor = props.bgColor || prev?.bg || styles.backgroundColor;

      ctx.clearRect(0, 0, props.size, props.size);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, props.size, props.size);
      ctx.fillStyle = color;
      for (let y = -props.border; y < qr.size + props.border; y++) {
        const ypos = (y + props.border) * scale;

        for (let x = -props.border; x < qr.size + props.border; x++) {
          if (qr.getModule(x, y)) {
            const xpos = (x + props.border) * scale;

            switch (props.shape) {
              case 'circle':
                ctx.beginPath();
                ctx.arc(xpos + radius, ypos + radius, radius, 0, Math.PI * 2);
                ctx.fill();
                break;
              case 'heart':
                ctx.beginPath();
                ctx.moveTo(xpos + radius, ypos + scale / 4);
                ctx.bezierCurveTo(
                  xpos + scale * 0.1,
                  ypos - scale * 0.2,
                  xpos - scale * 0.3,
                  ypos + scale * 0.6,
                  xpos + radius,
                  ypos + scale,
                );
                ctx.bezierCurveTo(
                  xpos + scale * 1.3,
                  ypos + scale * 0.6,
                  xpos + scale * 0.9,
                  ypos - scale * 0.2,
                  xpos + radius,
                  ypos + scale / 4,
                );
                ctx.closePath();
                ctx.fill();
                break;
              case 'rhombus':
                ctx.beginPath();
                ctx.moveTo(xpos + radius, ypos);
                ctx.lineTo(xpos + scale, ypos + radius);
                ctx.lineTo(xpos + radius, ypos + scale);
                ctx.lineTo(xpos, ypos + radius);
                ctx.closePath();
                ctx.fill();
                break;
              case 'rect':
              default:
                // 避免由于小数位带来的间隔问题
                ctx.fillRect(
                  Math.floor(xpos),
                  Math.floor(ypos),
                  Math.ceil(scale),
                  Math.ceil(scale),
                );
                break;
            }
          }
        }
      }
      // 恢复缩放
      // ctx.restore();
      // 如果有图标，则绘制到中心
      if (other.icon) {
        if (!img) {
          img = new Image(props.iconSize, props.iconSize);
        }
        img.src = other.icon;
        img.onload = () => {
          const offset = (props.size + props.border * scale - props.iconSize) / 2;

          ctx.drawImage(img!, offset, offset, props.iconSize, props.iconSize);
        };
      }
    } else {
      if (props.border < 0) {
        throw new RangeError('Border must be non-negative');
      }
      const parts: string[] = [];

      for (let y = 0; y < qr.size; y++) {
        for (let x = 0; x < qr.size; x++) {
          if (qr.getModule(x, y)) {
            switch (props.shape) {
              case 'circle':
                parts.push(
                  `M${x + props.border + 0.5},${y + props.border + 0.5} m -0.5, 0 a 0.5,0.5 0 1,0 1,0 a 0.5,0.5 0 1,0 -1,0`,
                );
                break;
              case 'rhombus':
                parts.push(
                  `M${x + props.border + 0.5},${y + props.border} L${x + props.border + 1},${y + props.border + 0.5} L${x + props.border + 0.5},${y + props.border + 1} L${x + props.border},${y + props.border + 0.5} Z`,
                );
                break;
              case 'heart':
                parts.push(
                  `M${x + props.border + 0.5},${y + props.border + 0.25} C${x + props.border + 0.1},${y + props.border - 0.2} ${x + props.border - 0.3},${y + props.border + 0.6} ${x + props.border + 0.5},${y + props.border + 1} C${x + props.border + 1.3},${y + props.border + 0.6} ${x + props.border + 0.9},${y + props.border - 0.2} ${x + props.border + 0.5},${y + props.border + 0.25} Z`,
                );
                break;
              case 'rect':
              default:
                parts.push(`M${x + props.border},${y + props.border}h1v1h-1z`);
                break;
            }
          }
        }
      }
      const paths = svg?.querySelectorAll('path') as unknown as SVGPathElement[];
      const box_size = qr.size + props.border * 2;

      svg?.setAttribute('viewBox', `0 0 ${box_size} ${box_size}`);
      styles = window.getComputedStyle(svg as unknown as Element);
      if (paths.length > 0) {
        paths[0].setAttribute('d', `M0,0 h${box_size}v${box_size}H0z`);
        paths[0].setAttribute('fill', props.bgColor || prev?.bg || styles.backgroundColor);
        paths[1].setAttribute('d', parts.join(' '));
        paths[1].setAttribute('fill', props.color || prev?.color || styles.color);
      }
      // icon
      const icon = svg?.querySelector('image');

      if (icon) {
        const offset = `${(qr.size + props.border * 2 - props.iconSize) / 2}`;

        icon.setAttribute('x', offset);
        icon.setAttribute('y', offset);
        icon.setAttribute('width', `${props.iconSize}`);
        icon.setAttribute('height', `${props.iconSize}`);
      }
    }

    return {
      color: styles.color,
      bg: styles.backgroundColor,
    };
  });

  return (
    <Show when={props.type === 'svg'} fallback={<canvas ref={cvs} role="img" />}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        stroke="none"
        width={props.size}
        height={props.size}
        ref={svg}
        shape-rendering="crispEdges"
        role="img"
      >
        <path />
        <path />
        <Show when={other.icon}>
          <image href={other.icon} preserveAspectRatio="xMidYMid meet" />
        </Show>
      </svg>
    </Show>
  );
};

export type QrCodeElement = CustomElement<QrCodeProps>;
export const defaultProps: QrCodeProps = {
  value: '',
  icon: void 0,
  color: void 0,
  bgColor: void 0,
  size: void 0,
  iconSize: void 0,
  ecl: void 0,
  minVersion: void 0,
  maxVersion: void 0,
  mask: void 0,
  boostEcc: false,
  border: void 0,
  type: void 0,
  shape: void 0,
};

customElement<QrCodeProps>('n-qrcode', defaultProps, (props, opt) => {
  const el = opt.element;

  createEffect(() => {
    clearAttribute(el, ['value', 'icon']);
  });
  return (
    <>
      <style textContent={inline} />
      <QRCode {...props} />
    </>
  );
});

export default QRCode;
