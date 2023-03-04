const { min, max, floor, round } = Math;

/**
 * 将颜色名称转换为 rgb/十六进制
 * @param {string} name 颜色名称
 * @returns {string | CanvasGradient | CanvasPattern} color
 */
function standardizeColor(name: string): string | CanvasGradient | CanvasPattern | null {
  // 由于无效颜色将被解析为黑色，因此将其过滤掉
  if (name.toLowerCase() === 'black') {
    return '#000000';
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ctx = document.createElement('canvas').getContext('2d')!;

  ctx.fillStyle = name;
  return ctx.fillStyle === '#000000' ? null : ctx.fillStyle;
}

/**
 * 将 HSV 光谱转换为 RGB
 * @param {number} h 色调
 * @param {number} s 饱和度
 * @param {number} v 亮度
 * @returns {number[]} RGB
 */
export function hsvToRgb(h: number, s: number, v: number) {
  const _h = (h / 360) * 6;
  const _s = s / 100;
  const _v = v / 100;
  const i = floor(_h);
  const f = _h - i;
  const p = _v * (1 - _s);
  const q = _v * (1 - f * _s);
  const t = _v * (1 - (1 - f) * _s);

  const mod = i % 6;
  const r = [_v, q, p, p, t, _v][mod];
  const g = [t, _v, _v, q, p, p][mod];
  const b = [p, p, t, _v, _v, q][mod];

  return [r * 255, g * 255, b * 255];
}

/**
 * 将 HSV 光谱转换为十六进制
 * @param {number} h 色调
 * @param {number} s 饱和度
 * @param {number} v 亮度
 * @returns {string[]} Hex values
 */
export function hsvToHex(h: number, s: number, v: number) {
  return hsvToRgb(h, s, v).map((e) => round(e).toString(16).padStart(2, '0'));
}

/**
 * 将 HSV 光谱转换为 CMYK
 * @param {number} h 色调
 * @param {number} s 饱和度
 * @param {number} v 亮度
 * @returns {number[]} CMYK values
 */
export function hsvToCmyk(h: number, s: number, v: number) {
  const rgb = hsvToRgb(h, s, v);
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const k = min(1 - r, 1 - g, 1 - b);
  const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
  const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
  const y = k === 1 ? 0 : (1 - b - k) / (1 - k);

  return [c * 100, m * 100, y * 100, k * 100];
}

/**
 * 将 HSV 光谱转换为 HSL
 * @param {number} h 色调
 * @param {number} s 饱和度
 * @param {number} v 亮度
 * @returns {number[]} HSL values
 */
export function hsvToHsl(h: number, s: number, v: number) {
  let _s = s / 100;
  const _v = v / 100;
  const l = ((2 - _s) * _v) / 2;

  if (l !== 0) {
    if (l === 1) {
      _s = 0;
    } else if (l < 0.5) {
      _s = (_s * _v) / (l * 2);
    } else {
      _s = (_s * _v) / (2 - l * 2);
    }
  }
  return [h, _s * 100, l * 100];
}

/**
 * 将 RGB 转换为 HSV
 * @param {number} r Red
 * @param {number} g Green
 * @param {number} b Blue
 * @return {number[]} HSV values.
 */
export function rgbToHsv(r: number, g: number, b: number) {
  const _r = r / 255,
    _g = g / 255,
    _b = b / 255;

  let h = 0,
    s;
  const minVal = min(_r, _g, _b);
  const maxVal = max(_r, _g, _b);
  const delta = maxVal - minVal;
  const v = maxVal;

  if (delta === 0) {
    h = s = 0;
  } else {
    s = delta / maxVal;
    const dr = ((maxVal - _r) / 6 + delta / 2) / delta;
    const dg = ((maxVal - _g) / 6 + delta / 2) / delta;
    const db = ((maxVal - _b) / 6 + delta / 2) / delta;

    if (_r === maxVal) {
      h = db - dg;
    } else if (_g === maxVal) {
      h = 1 / 3 + dr - db;
    } else if (_b === maxVal) {
      h = 2 / 3 + dg - dr;
    }

    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }

  return [h * 360, s * 100, v * 100];
}

/**
 * 将 CMYK 转换为 HSV
 * @param {number} c Cyan
 * @param {number} m Magenta
 * @param {number} y Yellow
 * @param {number} k Key (Black)
 * @return {number[]} HSV values.
 */
export function cmykToHsv(c: number, m: number, y: number, k: number) {
  const _c = c / 100,
    _m = m / 100,
    _y = y / 100,
    _k = k / 100;

  const r = (1 - min(1, _c * (1 - _k) + _k)) * 255;
  const g = (1 - min(1, _m * (1 - _k) + _k)) * 255;
  const b = (1 - min(1, _y * (1 - _k) + _k)) * 255;

  return [...rgbToHsv(r, g, b)];
}

/**
 * 将 HSL 转换为 HSV
 * @param {number} h Hue
 * @param {number} s Saturation
 * @param {number} l Lightness
 * @return {number[]} HSV values.
 */
export function hslToHsv(h: number, s: number, l: number) {
  const _l = l / 100;
  let _s = s / 100;

  _s *= _l < 0.5 ? _l : 1 - _l;
  const ns = _l + _s ? ((2 * _s) / (_l + _s)) * 100 : 0;
  const v = (_l + _s) * 100;

  return [h, ns, v];
}

/**
 * 将 HEX 转换为 HSV
 * @param {number} hex RGB 颜色的十六进制字符串，长度可以是 3 或 6
 * @return {number[]} HSV values.
 */
export function hexToHsv(hex: string) {
  const [r, g, b] = hex.match(/.{2}/g)?.map((v: string) => parseInt(v, 16)) || [];

  return rgbToHsv(r, g, b);
}

// 匹配不同类型颜色表示的正则表达式
const colorRegex = {
  cmyk: /^cmyk[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)/i,
  rgba: /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,
  hsla: /^((hsla)|hsl)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,
  hsva: /^((hsva)|hsv)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,
  hexa: /^#?(([\dA-Fa-f]{3,4})|([\dA-Fa-f]{6})|([\dA-Fa-f]{8}))$/i,
};

export type ColorType = keyof typeof colorRegex;
/**
 * 尝试将表示颜色的字符串解析为 HSV 数组
 * 当前支持的类型是 cmyk、rgba、hsla 和十六进制
 * @param {string} str color
 * @return {*} HSVA
 */
export function parseToHSVA(str: string): {
  values: number[];
  type: ColorType;
  a: number;
} {
  // 检查字符串是否是颜色名称
  const _str = str.match(/^[a-zA-Z]+$/) ? standardizeColor(str) : str;

  /**
   * 采用任何类型的数组，将表示数字的字符串转换为数字，将其他任何内容转换为未定义
   * @param {number[]} array any
   * @return {*} s
   */
  const numarize = (array: string[]) =>
    // eslint-disable-next-line no-undefined
    array.map((v: string) => (/^(|\d+)\.\d+|\d+$/.test(v) ? Number(v) : undefined));

  let match;

  for (const key in colorRegex) {
    if (Object.prototype.hasOwnProperty.call(colorRegex, key)) {
      const type = key as ColorType;

      // 检查当前方案是否通过
      if (!(match = colorRegex[type].exec(_str as string))) {
        continue;
      }

      // match[2] 仅在 rgba、hsla 或 hsla 匹配时才包含真实值
      // const alpha = !!match[2];

      switch (type) {
        case 'cmyk': {
          const [, c = 0, m = 0, y = 0, k = 0] = numarize(match);

          if (c > 100 || m > 100 || y > 100 || k > 100) break;
          return { values: cmykToHsv(c, m, y, k), type, a: 1 };
        }
        case 'rgba': {
          const [, , , r = 0, g = 0, b = 0, a = 1] = numarize(match);

          if (r > 255 || g > 255 || b > 255 || a < 0 || a > 1) break;
          return { values: [...rgbToHsv(r, g, b), a], a, type };
        }
        case 'hexa': {
          let [, hex] = match;

          if (hex.length === 4 || hex.length === 3) {
            hex = hex
              .split('')
              .map((v: string) => v + v)
              .join('');
          }
          // 将 0 - 255 转换为 0 - 1 以获得不透明度
          const raw = hex.substring(0, 6),
            _a = hex.substring(6),
            a = _a ? parseInt(_a, 16) / 255 : 1;

          return { values: [...hexToHsv(raw), a], a, type };
        }
        case 'hsla': {
          const [, , , h = 0, s = 0, l = 0, a = 1] = numarize(match);

          if (h > 360 || s > 100 || l > 100 || a < 0 || a > 1) break;

          return { values: [...hslToHsv(h, s, l), a], a, type };
        }
        case 'hsva': {
          const [, , , h = 0, s = 0, v = 0, a = 1] = numarize(match);

          if (h > 360 || s > 100 || v > 100 || a < 0 || a > 1) break;

          return { values: [h, s, v, a], a, type };
        }
        default: {
          return { values: [0, 0, 0, 1], type: 'hsva', a: 1 };
        }
      }
    }
  }

  return { values: [0, 0, 0, 1], type: 'hsva', a: 1 };
}
