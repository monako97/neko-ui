import { hsvToHsl, hsvToRgb, hsvToCmyk, hsvToHex } from './color';

interface HSVA {
  h: number;
  s: number;
  v: number;
  a: number;
  toHSVA(): number[];
  toHSLA(): number[];
  toRGBA(): number[];
  toCMYK(): number[];
  toHEXA(): string[];
  clone: () => HSVA;
}

export type HSVAVoidName = 'toHSVA' | 'toHSLA' | 'toRGBA' | 'toCMYK' | 'toHEXA';
/**
 * 保存颜色表示模型 hsla（色调、饱和度、亮度、alpha）属性的简单类
 * @param {number} h 色调
 * @param {number} s 饱和度
 * @param {number} v 亮度
 * @param {number} a 透明度
 * @returns {HSVA} HSVA
 */
export function genHSVA(h = 0, s = 0, v = 0, a = 1): HSVA {
  // eslint-disable-next-line no-unused-vars
  const mapper = (original: number[], next: (_: number[]) => string) => {
    return (precision = 0) => {
      return next(
        ~precision ? original.map((o: number) => Number(o.toFixed(precision))) : original
      );
    };
  };

  return {
    h,
    s,
    v,
    a,
    toHSVA() {
      const _hsva = [h, s, v, a];

      _hsva.toString = mapper(_hsva, (arr) => `hsva(${arr[0]}, ${arr[1]}%, ${arr[2]}%, ${a})`);
      return _hsva;
    },

    toHSLA() {
      const hsla = [...hsvToHsl(h, s, v), a];

      hsla.toString = mapper(hsla, (arr) => `hsla(${arr[0]}, ${arr[1]}%, ${arr[2]}%, ${a})`);
      return hsla;
    },

    toRGBA() {
      const rgba = [...hsvToRgb(h, s, v), a];

      rgba.toString = mapper(rgba, (arr) => `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${a})`);
      return rgba;
    },

    toCMYK() {
      const cmyk = hsvToCmyk(h, s, v);

      cmyk.toString = mapper(cmyk, (arr) => `cmyk(${arr[0]}%, ${arr[1]}%, ${arr[2]}%, ${arr[3]}%)`);
      return cmyk;
    },

    toHEXA() {
      const hex = hsvToHex(h, s, v);
      // 检查 alpha 通道是否有意义，将其转换为 255 数字空间，转换为十六进制并在需要时用零填充
      let alpha = '';

      if (a < 1) {
        alpha = Number((a * 255).toFixed(0))
          .toString(16)
          .toUpperCase()
          .padStart(2, '0');
      }
      if (alpha) {
        hex.push(alpha);
      }
      hex.toString = () => `#${hex.join('').toUpperCase()}`;
      return hex;
    },

    clone: () => genHSVA(h, s, v, a),
  };
}
