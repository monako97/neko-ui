/*
 * QR Code generator library
 *
 * Copyright (c) Project Nayuki. (MIT License)
 * https://www.nayuki.io/page/qr-code-generator-library
 */

// 注意索引0用于填充，并设置为一个非法值
const ECC_CODEWORDS_PER_BLOCK = [
  [
    -1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30,
    30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
  ], // Low
  [
    -1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28,
    28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
  ], // Medium
  [
    -1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30,
    30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
  ], // Quartile
  [
    -1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30,
    30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
  ], // High
];
const NUM_ERROR_CORRECTION_BLOCKS = [
  [
    -1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14,
    15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25,
  ],
  [
    -1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23,
    25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49,
  ],
  [
    -1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34,
    34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68,
  ],
  [
    -1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35,
    37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81,
  ],
];

// 返回在给定版本的QR码中可以存储的数据位数，已排除所有功能模块。这包括余数位，因此可能不是8的倍数。结果范围在[208, 29648]之间。这可以实现为一个40项的查找表。
function getNumRawDataModules(ver: number): number {
  if (ver < QrCode.VERSION.MIN || ver > QrCode.VERSION.MAX) {
    throw new RangeError('Version number out of range');
  }
  let result = (16 * ver + 128) * ver + 64;

  if (ver >= 2) {
    const numAlign = Math.floor(ver / 7) + 2;

    result -= (25 * numAlign - 10) * numAlign - 55;
    if (ver >= 7) result -= 36;
  }
  assert(208 <= result && result <= 29648);
  return result;
}
// 返回指定版本号和纠错级别的 QR 码包含的 8 位数据码字数量（即非纠错码字），余位被舍弃。这个无状态的纯函数可以实现为一个 (40*4) 大小的查找表。
function getNumDataCodewords(ver: number, ecl: Ecc): number {
  return (
    Math.floor(getNumRawDataModules(ver) / 8) -
    ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver] * NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver]
  );
}
/**
 * 生成一个 QR 码
 * @description
 * 根据给定的数据段和编码参数生成 QR 码。输出时会自动选择给定范围内尽可能小的 QR 码版本
 * @param {Readonly<QrSegment[]>} segs - 要编码的 QR 数据段
 * @param {Ecc} ecl - 纠错级别
 * @param {IntRange<1, 41>} [minVersion=1] - 最小版本（默认为 1）
 * @param {IntRange<1, 41>} [maxVersion=40] - 最大版本（默认为 40）
 * @param {-1 | IntRange<0, 8>} [mask=-1] - 掩码模式（默认为 -1，表示自动选择）
 * @param {boolean} [boostEcl=true] - 在数据仍然适合当前版本号的情况下提高纠错级别（默认为 true）。
 * @returns {QrCode} 返回生成的 QR 码。
 */
export function encodeSegments(
  segs: Readonly<QrSegment[]>,
  ecl: Ecc,
  minVersion: IntRange<1, 41> = 1,
  maxVersion: IntRange<1, 41> = 40,
  mask: -1 | IntRange<0, 8> = -1,
  boostEcl: boolean = true,
): QrCode {
  if (
    !(
      QrCode.VERSION.MIN <= minVersion &&
      minVersion <= maxVersion &&
      maxVersion <= QrCode.VERSION.MAX
    ) ||
    mask < -1 ||
    mask > 7
  ) {
    throw new RangeError('Invalid value');
  }
  // 查找要使用的最小版本号
  let version: IntRange<1, 41>,
    dataUsedBits: number,
    _ecl = ecl;

  for (version = minVersion; ; version++) {
    const dataCapacityBits = getNumDataCodewords(version, _ecl) * 8, // 可用的数据位数
      usedBits = getTotalBits(segs, version);

    // 找到合适的版本号
    if (usedBits <= dataCapacityBits) {
      dataUsedBits = usedBits;
      break;
    }
    if (version >= maxVersion) {
      // 范围内的所有版本都无法容纳给定数据
      throw new RangeError('Data too long');
    }
  }
  // 提高纠错级别; 从低到高
  if (boostEcl) {
    for (const newEcl of [Ecc.get('MEDIUM'), Ecc.get('QUARTILE'), Ecc.get('HIGH')]) {
      if (dataUsedBits <= getNumDataCodewords(version, newEcl) * 8) _ecl = newEcl;
    }
  }
  // 连接所有段以创建数据位字符串
  const bb: number[] = [];

  for (const seg of segs) {
    appendBits(seg.mode.modeBits, 4, bb);
    appendBits(seg.numChars, seg.mode.numCharCountBits(version), bb);
    for (const b of seg.getData()) bb.push(b);
  }
  assert(bb.length === dataUsedBits);
  // 添加终止符并填充至字节边界(如果适用)
  const dataCapacityBits: number = getNumDataCodewords(version, _ecl) * 8;

  assert(bb.length <= dataCapacityBits);
  appendBits(0, Math.min(4, dataCapacityBits - bb.length), bb);
  appendBits(0, (8 - (bb.length % 8)) % 8, bb);
  assert(bb.length % 8 === 0);
  // 用交替字节填充直到达到数据容量
  for (let padByte = 0xec; bb.length < dataCapacityBits; padByte ^= 0xec ^ 0x11) {
    appendBits(padByte, 8, bb);
  }
  // 以大端序将位打包成字节
  const dataCodewords: number[] = [];

  while (dataCodewords.length * 8 < bb.length) dataCodewords.push(0);
  bb.forEach((b, i) => (dataCodewords[i >>> 3] |= b << (7 - (i & 7))));
  return new QrCode(version, _ecl, dataCodewords, mask);
}

// 返回表示给定字符串的UTF-8编码字节数组
function toUtf8ByteArray(str: string): number[] {
  // eslint-disable-next-line no-param-reassign
  str = encodeURI(str);
  const result: number[] = [];

  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) !== '%') result.push(str.charCodeAt(i));
    else {
      result.push(parseInt(str.substring(i + 1, i + 3), 16));
      i += 2;
    }
  }
  return result;
}

// 返回一个新的可变段列表,用于表示给定的Unicode文本字符串。结果可能使用各种段模式并切换模式以优化位流的长度。
export function makeSegments(text: string): QrSegment[] {
  // 自动选择最高效的段编码
  if (text === '') return [];
  else if (isNumeric(text)) return [makeNumeric(text)];
  else if (isAlphanumeric(text)) return [makeAlphanumeric(text)];
  return [makeBytes(toUtf8ByteArray(text))];
}

function reedSolomonComputeDivisor(degree: number): number[] {
  if (degree < 1 || degree > 255) throw new RangeError('Degree out of range');
  // 多项式系数按从高到低的幂次存储,不包括始终为1的首项。
  // 例如多项式 x^3 + 255x^2 + 8x + 93 存储为uint8数组 [255, 8, 93]。
  const result: number[] = [];

  for (let i = 0; i < degree - 1; i++) result.push(0);
  result.push(1); // Start off with the monomial x^0

  // 计算多项式乘积 (x - r^0) * (x - r^1) * (x - r^2) * ... * (x - r^{degree-1})，
  // 并舍弃最高次项（该项始终为 1x^degree）。
  // 注意 r = 0x02，它是有限域 GF(2^8/0x11D) 的生成元。
  let root = 1;

  for (let i = 0; i < degree; i++) {
    // 将当前结果乘以 (x - r^i)
    for (let j = 0; j < result.length; j++) {
      result[j] = reedSolomonMultiply(result[j], root);
      if (j + 1 < result.length) result[j] ^= result[j + 1];
    }
    root = reedSolomonMultiply(root, 0x02);
  }
  return result;
}

// 返回给定数据和除数多项式的里德-所罗门错误纠正码字。
function reedSolomonComputeRemainder(
  data: Readonly<number[]>,
  divisor: Readonly<number[]>,
): number[] {
  const result = divisor.map(() => 0);

  for (const b of data) {
    // 多项式除法
    const factor = b ^ (result.shift() as number);

    result.push(0);
    divisor.forEach((coef, i) => (result[i] ^= reedSolomonMultiply(coef, factor)));
  }
  return result;
}

// 返回两个给定域元素模GF(2^8/0x11D)的乘积。参数和结果
// 都是无符号8位整数。这可以实现为256*256个uint8条目的查找表。
function reedSolomonMultiply(x: number, y: number): number {
  if (x >>> 8 !== 0 || y >>> 8 !== 0) throw new RangeError('Byte out of range');
  // 俄罗斯农民乘法
  let z: number = 0;

  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >>> 7) * 0x11d);
    z ^= ((y >>> i) & 1) * x;
  }
  assert(z >>> 8 === 0);
  return z;
}

/*
 * 由 Denso Wave 发明，并在 ISO/IEC 18004 标准中描述。
 * 此类的实例表示一个不可变的暗/亮单元方格网。
 * 该类遵循 QR 码模型 2 规范，支持所有版本（尺寸）从 1 到 40、4 种纠错等级以及 4 种字符编码模式。
 */
class QrCode {
  // QR Code 的模块（false 表示浅色，true 表示深色）。构造函数完成后不可更改。通过 getModule() 访问。
  private readonly modules: boolean[][] = [];
  // 表示不受掩模影响的功能模块。构造函数完成后即被丢弃。
  private readonly isFunction: boolean[][] = [];
  /**
   * 获取 QR Code 的宽度和高度，以模块为单位。
   * 宽度和高度范围为 21 至 177（包括边界）。宽度和高度的计算公式为：`version * 4 + 17`。
   */
  public readonly size: number;
  /**
   * 获取 QR Code 所使用的掩膜模式的索引值。掩膜模式索引值范围为 0 到 7（包括边界）。即使 QR Code 是通过自动掩膜（mask = -1）生成的，最终的掩膜值仍然是 0 到 7 之间的有效值。
   */
  public readonly mask: IntRange<0, 8>;
  // 支持的版本, QR码模型2标准
  public static readonly VERSION = {
    MIN: 1,
    MAX: 40,
  } as const;
  // 惩罚分数常量, 用于 getPenaltyScore()，在评估哪个掩码最佳时使用。
  private static readonly PENALTY = {
    N1: 3, // 相同颜色的连续模块
    N2: 3, // 2x2 块
    N3: 40, // 查找器类似模式
    N4: 10, // 暗模块比例
  } as const;
  // 选择最佳掩码
  private selectMask(msk: -1 | IntRange<0, 8>): IntRange<0, 8> {
    if (msk !== -1) return msk;
    let mask: IntRange<0, 8> = 0;
    let minPenalty = 1000000000;

    for (let i = 0; i < 8; i++) {
      // 自动选择最佳掩模
      this.applyMask(i);
      this.drawFormatBits(i);
      const penalty = this.getPenaltyScore();

      if (penalty < minPenalty) {
        mask = i as IntRange<0, 8>;
        minPenalty = penalty;
      }
      // 撤销掩码
      this.applyMask(i);
    }
    assert(0 <= mask && mask <= 7);
    return mask;
  }
  // 使用给定的版本号、错误纠正级别、数据码字节和掩膜编号创建一个新的QR码。
  public constructor(
    // 此 QR Code 的版本号，范围为 1 到 40（含）;该值决定了二维码的尺寸。
    public readonly version: IntRange<1, 41>,
    // 错误纠正级别。
    public readonly errorCorrectionLevel: Ecc,
    dataCodewords: Readonly<number[]>,
    msk: -1 | IntRange<0, 8>,
  ) {
    // 验证构造函数参数
    if (version < QrCode.VERSION.MIN || version > QrCode.VERSION.MAX) {
      throw new RangeError('Version value out of range');
    }
    if (msk < -1 || msk > 7) throw new RangeError('Mask value out of range');
    // 初始化
    this.size = version * 4 + 17;
    // 创建模块数组
    // 初始化两个网格为 size*size 大小的布尔数组，初始值为 false 全为浅色
    const row = Array(this.size).fill(false);

    for (let i = 0; i < this.size; i++) {
      this.modules[i] = row.slice();
      this.isFunction[i] = row.slice();
    }
    // 计算错误纠正码（ECC），绘制模块
    this.drawFunctionPatterns();
    // 构建 QR 码的主要流程
    const allCodewords = this.addEccAndInterleave(dataCodewords);

    this.drawCodewords(allCodewords);
    // 确定最终掩码
    this.mask = this.selectMask(msk);
    // 应用最终掩码并绘制格式位
    this.applyMask(this.mask);
    this.drawFormatBits(this.mask);
    // 构造完成, 丢弃
    this.isFunction = [];
  }

  /* -- 访问器方法 --*/
  // 返回给定坐标处模块（像素xy的颜色，浅色时为false，深色时为true);如果给定的坐标超出边界，则返回false（浅色）。
  public getModule(x: number, y: number): boolean {
    return x >= 0 && x < this.size && y >= 0 && y < this.size && this.modules[y][x];
  }
  /* -- 构造函数的私有辅助方法：绘制功能模块 --*/

  // 读取该对象的版本字段，并绘制和标记所有功能模块。
  private drawFunctionPatterns(): void {
    // 绘制水平和垂直定时图案
    for (let i = 0; i < this.size; i++) {
      const flag = i % 2 === 0;

      this.setFunctionModule(6, i, flag);
      this.setFunctionModule(i, 6, flag);
    }
    // 绘制 3 个定位图案（除了右下角的所有角落；会覆盖一些定时模块）
    this.drawFinderPattern(3, 3);
    const y = this.size - 4;

    this.drawFinderPattern(y, 3);
    this.drawFinderPattern(3, y);
    // 绘制多个对齐图案
    const alignPatPos = this.getAlignmentPatternPositions();
    const numAlign = alignPatPos.length;

    for (let i = 0; i < numAlign; i++) {
      for (let j = 0; j < numAlign; j++) {
        // 不在三个定位图案的角落处绘制
        if (
          !(
            (i === 0 && j === 0) ||
            (i === 0 && j === numAlign - 1) ||
            (i === numAlign - 1 && j === 0)
          )
        ) {
          this.drawAlignmentPattern(alignPatPos[i], alignPatPos[j]);
        }
      }
    }
    // 绘制配置数据
    this.drawFormatBits(0); // 临时掩码值；稍后在构造函数中会被覆盖
    this.drawVersion();
  }

  // 绘制格式位的两个副本（带有其自己的错误纠正码）
  // 基于给定的掩码和该对象的错误纠正级别字段。
  private drawFormatBits(mask: number): void {
    // 计算错误纠正码并打包位
    const data: number = (this.errorCorrectionLevel.formatBits << 3) | mask; // errCorrLvl 是 uint2 类型，mask 是 uint3 类型
    let rem: number = data;

    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    const bits = ((data << 10) | rem) ^ 0x5412; // uint15

    assert(bits >>> 15 === 0);
    // 绘制第一个副本
    for (let i = 0; i <= 5; i++) this.setFunctionModule(8, i, getBit(bits, i));
    this.setFunctionModule(8, 7, getBit(bits, 6));
    this.setFunctionModule(8, 8, getBit(bits, 7));
    this.setFunctionModule(7, 8, getBit(bits, 8));
    for (let i = 9; i < 15; i++) {
      this.setFunctionModule(14 - i, 8, getBit(bits, i));
    }
    // 绘制第二个副本
    for (let i = 0; i < 8; i++) {
      this.setFunctionModule(this.size - 1 - i, 8, getBit(bits, i));
    }
    for (let i = 8; i < 15; i++) {
      this.setFunctionModule(8, this.size - 15 + i, getBit(bits, i));
    }
    this.setFunctionModule(8, this.size - 8, true); // Always dark
  }

  // 如果7 <= version <= 40，则绘制版本位的两个副本（带有其自己的错误纠正码），
  // 基于该对象的版本字段。
  private drawVersion(): void {
    if (this.version < 7) return;

    // 计算错误纠正码并打包位
    let rem: number = this.version; // version 是 uint6 类型，范围在 [7, 40]

    for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
    const bits: number = (this.version << 12) | rem; // uint18

    assert(bits >>> 18 === 0);
    // 绘制两个副本
    for (let i = 0; i < 18; i++) {
      const color: boolean = getBit(bits, i);
      const a: number = this.size - 11 + (i % 3);
      const b: number = Math.floor(i / 3);

      this.setFunctionModule(a, b, color);
      this.setFunctionModule(b, a, color);
    }
  }
  // 绘制一个9*9的定位图案，包括边界分隔符，中心模块位于(x, y)。模块可以超出边界。
  private drawFinderPattern(x: number, y: number): void {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const dist = Math.max(Math.abs(dx), Math.abs(dy)), // Chebyshev/无穷范数
          xx = x + dx,
          yy = y + dy;

        if (0 <= xx && xx < this.size && 0 <= yy && yy < this.size) {
          this.setFunctionModule(xx, yy, dist !== 2 && dist !== 4);
        }
      }
    }
  }
  // 绘制一个5*5的对齐图案，中心模块位于(x, y)。所有模块必须在边界内。
  private drawAlignmentPattern(x: number, y: number): void {
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        this.setFunctionModule(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
      }
    }
  }
  // 设置模块的颜色并将其标记为功能模块。仅由构造函数使用。坐标必须在边界内。
  private setFunctionModule(x: number, y: number, isDark: boolean): void {
    this.modules[y][x] = isDark;
    this.isFunction[y][x] = true;
  }
  // 返回一个新的字节字符串，表示具有适当错误纠正码字的给定数据，基于该对象的版本和错误纠正级别。
  private addEccAndInterleave(data: Readonly<number[]>): number[] {
    const ver = this.version,
      ecl = this.errorCorrectionLevel;

    if (data.length !== getNumDataCodewords(ver, ecl)) {
      throw new RangeError('Invalid argument');
    }
    // 计算参数数值
    const numBlocks = NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver],
      blockEccLen = ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver],
      rawCodewords = Math.floor(getNumRawDataModules(ver) / 8),
      numShortBlocks = numBlocks - (rawCodewords % numBlocks),
      shortBlockLen = Math.floor(rawCodewords / numBlocks),
      blocks: number[][] = [], // 将数据分割成块并为每个块附加ECC
      rsDiv = reedSolomonComputeDivisor(blockEccLen);

    for (let i = 0, k = 0; i < numBlocks; i++) {
      const dat = data.slice(k, k + shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1));
      const ecc = reedSolomonComputeRemainder(dat, rsDiv);

      k += dat.length;
      if (i < numShortBlocks) dat.push(0);
      blocks.push(dat.concat(ecc));
    }
    //  将每个块的字节交错(而不是连接)成单个序列
    const result: number[] = [];

    for (let i = 0; i < blocks[0].length; i++) {
      blocks.forEach((block, j) => {
        // 跳过短块中的填充字节
        if (i !== shortBlockLen - blockEccLen || j >= numShortBlocks) {
          result.push(block[i]);
        }
      });
    }
    assert(result.length === rawCodewords);
    return result;
  }
  // 将给定的8位码字序列(数据和错误纠正)绘制到此QR码的整个
  // 数据区域上。在调用此方法之前需要标记功能模块。
  private drawCodewords(data: Readonly<number[]>): void {
    if (data.length !== Math.floor(getNumRawDataModules(this.version) / 8)) {
      throw new RangeError('Invalid argument');
    }
    let i = 0; // 数据的位索引
    const len = data.length * 8;

    // 执行特殊的之字形扫描
    for (let right = this.size - 1; right >= 1; right -= 2) {
      // 每对列中右列的索引
      if (right === 6) right = 5;
      for (let vert = 0; vert < this.size; vert++) {
        // 垂直计数器
        for (let j = 0; j < 2; j++) {
          const x = right - j, // 实际的x坐标
            y = ((right + 1) & 2) === 0 ? this.size - 1 - vert : vert; // 实际的y坐标

          if (!this.isFunction[y][x] && i < len) {
            this.modules[y][x] = getBit(data[i >>> 3], 7 - (i & 7));
            i++;
          }
          // 如果此QR码有任何剩余位(0到7位)，它们被构造函数赋值为0/false/浅色，且此方法不会改变它们
        }
      }
    }
    assert(i === len);
  }
  // 掩码模式定义
  private readonly MASK_PATTERNS: ((_: number, y: number) => boolean)[] = [
    (x, y) => (x + y) % 2 === 0,
    (_, y) => y % 2 === 0,
    (x) => x % 3 === 0,
    (x, y) => (x + y) % 3 === 0,
    (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
    (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
    (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
    (x, y) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0,
  ] as const;
  // 使用给定的掩码模式对此QR码中的码字模块进行XOR运算。在掩码之前必须标记功能模块并绘制码字位。
  private applyMask(mask: number): void {
    if (mask < 0 || mask > 7) throw new RangeError('Mask value out of range');
    const maskPattern = this.MASK_PATTERNS[mask];

    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (!this.isFunction[y][x] && maskPattern(x, y)) {
          this.modules[y][x] = !this.modules[y][x];
        }
      }
    }
  }
  // 计算并返回基于此 QR 码当前模块状态的惩罚分数。用于自动掩码选择算法，以找到产生最低分数的掩码模式。
  private getPenaltyScore(): number {
    let result: number = 0;

    // 行中具有相同颜色的相邻模块，以及查找器类似的模式
    for (let y = 0; y < this.size; y++) {
      let runColor = false;
      let runX = 0;
      const runHistory = [0, 0, 0, 0, 0, 0, 0];

      for (let x = 0; x < this.size; x++) {
        if (this.modules[y][x] === runColor) {
          runX++;
          if (runX === 5) result += QrCode.PENALTY.N1;
          else if (runX > 5) result++;
        } else {
          this.finderPenaltyAddHistory(runX, runHistory);
          if (!runColor) {
            result += this.finderPenaltyCountPatterns(runHistory) * QrCode.PENALTY.N3;
          }
          runColor = this.modules[y][x];
          runX = 1;
        }
      }
      result += this.finderPenaltyTerminateAndCount(runColor, runX, runHistory) * QrCode.PENALTY.N3;
    }
    // 列中具有相同颜色的相邻模块，以及查找器类似的模式
    for (let x = 0; x < this.size; x++) {
      let runColor = false;
      let runY = 0;
      const runHistory = [0, 0, 0, 0, 0, 0, 0];

      for (let y = 0; y < this.size; y++) {
        if (this.modules[y][x] === runColor) {
          runY++;
          if (runY === 5) result += QrCode.PENALTY.N1;
          else if (runY > 5) result++;
        } else {
          this.finderPenaltyAddHistory(runY, runHistory);
          if (!runColor) {
            result += this.finderPenaltyCountPatterns(runHistory) * QrCode.PENALTY.N3;
          }
          runColor = this.modules[y][x];
          runY = 1;
        }
      }
      result += this.finderPenaltyTerminateAndCount(runColor, runY, runHistory) * QrCode.PENALTY.N3;
    }
    // 2*2 块的模块具相同的颜色
    for (let y = 0; y < this.size - 1; y++) {
      for (let x = 0; x < this.size - 1; x++) {
        const color = this.modules[y][x];

        if (
          color === this.modules[y][x + 1] &&
          color === this.modules[y + 1][x] &&
          color === this.modules[y + 1][x + 1]
        ) {
          result += QrCode.PENALTY.N2;
        }
      }
    }
    // 暗模块和亮模块的平衡
    let dark: number = 0;

    for (const row of this.modules) {
      dark = row.reduce((sum, color) => sum + (color ? 1 : 0), dark);
    }
    // 注意，size 是奇数，所以 dark/total !== 1/2
    const total: number = this.size * this.size;
    // 计算最小的整数 k >= 0，使得 (45-5k)% <= dark/total <= (55+5k)%
    const k: number = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;

    assert(0 <= k && k <= 9);
    result += k * QrCode.PENALTY.N4;
    assert(0 <= result && result <= 2568888); // 基于默认值的非紧密上限
    return result;
  }
  // 返回一个升序的位置列表，表示此版本号的对齐模式位置。每个位置在 [0,177) 范围内，并用于行和列轴。这可以实现为 40 个可变长度整数列表的查找表。
  private getAlignmentPatternPositions(): number[] {
    if (this.version === 1) return [];
    const numAlign = Math.floor(this.version / 7) + 2,
      step = Math.floor((this.version * 8 + numAlign * 3 + 5) / (numAlign * 4 - 4)) * 2,
      result = [6];

    for (let pos = this.size - 7; result.length < numAlign; pos -= step) {
      result.splice(1, 0, pos);
    }
    return result;
  }
  // 只能在添加了亮色运行后立即调用，并返回 0、1 或 2。这是 getPenaltyScore() 的辅助函数。
  private finderPenaltyCountPatterns(runHistory: Readonly<number[]>): number {
    const n = runHistory[1];

    assert(n <= this.size * 3);
    // 提前验证 n 的有效性
    if (n <= 0) return 0;
    const validScore =
      runHistory[2] === n && runHistory[3] === n * 3 && runHistory[4] === n && runHistory[5] === n;

    if (!validScore) return 0;
    // 检查两端的延伸模式
    let score = 0;

    if (runHistory[0] >= n * 4 && runHistory[6] >= n) score++;
    if (runHistory[6] >= n * 4 && runHistory[0] >= n) score++;
    return score;
  }
  // 必须在行（或列）的模块结束时调用。这是 getPenaltyScore() 的辅助函数。
  private finderPenaltyTerminateAndCount(
    runColor: boolean,
    runLength: number,
    runHistory: number[],
  ): number {
    if (runColor) {
      // 终止暗色运行
      this.finderPenaltyAddHistory(runLength, runHistory);
      // eslint-disable-next-line no-param-reassign
      runLength = 0;
    }
    // eslint-disable-next-line no-param-reassign
    runLength += this.size; // 添加亮色边框到最终运行
    this.finderPenaltyAddHistory(runLength, runHistory);
    return this.finderPenaltyCountPatterns(runHistory);
  }
  // 将给定值推到前面并丢弃最后一个值。这是 getPenaltyScore() 的辅助函数。
  private finderPenaltyAddHistory(runLength: number, runHistory: number[]): void {
    // eslint-disable-next-line no-param-reassign
    if (runHistory[0] === 0) runLength += this.size; // 添加亮色边框到初始运行
    runHistory.pop();
    runHistory.unshift(runLength);
  }
}
// 将给定数值的低位比特位追加到给定缓冲区。要求 0 <= len <= 31 且 0 <= val < 2^len。
function appendBits(val: number, len: number, bb: number[]): void {
  if (len < 0 || len > 31 || val >>> len !== 0) {
    throw new RangeError('Value out of range');
  }
  for (let i = len - 1; i >= 0; i--) {
    // 逐位追加
    bb.push((val >>> i) & 1);
  }
}
// 返回x的第i位是否为1。
function getBit(x: number, i: number): boolean {
  return ((x >>> i) & 1) !== 0;
}
// 如果给定条件为false则抛出异常。
function assert(cond: boolean): void {
  if (!cond) throw new Error('Assertion error');
}
/*
 * QR码符号中的 字符/二进制 数据段
 */
class QrSegment {
  // 使用给定的属性和数据创建一个新的QR码段。字符计数（numChars）必须与模式和位缓冲区长度一致，但不进行检查。给定的位缓冲区被克隆并存储。
  public constructor(
    // 此段的模式指示符。
    public readonly mode: QrMode,
    // 此段未编码数据的长度。对于数字/字母数字/汉字模式，以字符为单位测量；对于字节模式，以字节为单位测量；对于ECI模式，为0; 始终为零或正数。不是数据的位长度。
    public readonly numChars: number,
    // 此段的数据位。通过getData()访问。
    readonly bitData: number[],
  ) {
    if (numChars < 0) throw new RangeError('Invalid argument');
    this.bitData = bitData.slice(); // 进行防御性拷贝
  }
  // 返回此段数据位的新副本。
  public getData(): number[] {
    return this.bitData.slice(); // 进行防御性拷贝
  }
}
const NUMERIC_REGEX: RegExp = /^[0-9]*$/;
const ALPHANUMERIC_REGEX: RegExp = /^[A-Z0-9 $%*+./:-]*$/;
// 字母数字模式中所有合法字符的集合，其中每个字符值映射到字符串中的索引。
const ALPHANUMERIC_CHARSET: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';

// 是否可以用数字模式编码。当且仅当每个字符都在0到9的范围内时，字符串可编码。
function isNumeric(text: string): boolean {
  return NUMERIC_REGEX.test(text);
}
/**
 * 是否可以用字母数字模式编码
 * @description 0到9、A到Z仅大写）、空格、美元符号、百分号、星号、加号、连字符、句点、斜杠、冒号。
 * @param {String} text 给定字符串
 * @returns {Boolean} boolean
 */
function isAlphanumeric(text: string): boolean {
  return ALPHANUMERIC_REGEX.test(text);
}
// 返回一个表示以字节模式编码的给定二进制数据的段。所有输入字节数组都是可接受的。任何文本字符串都可以转换为UTF-8字节并编码为字节模式段。
function makeBytes(data: Readonly<number[]>): QrSegment {
  const bb: number[] = [];

  for (const b of data) appendBits(b, 8, bb);
  return new QrSegment(QrMode.get('BYTE'), data.length, bb);
}
// 计算并返回在给定版本下编码给定段所需的位数。如果某个段的字符数太多以至于无法适应其长度字段，则结果为无穷大。
function getTotalBits(segs: Readonly<QrSegment[]>, version: number): number {
  let result: number = 0;

  for (const seg of segs) {
    const ccbits: number = seg.mode.numCharCountBits(version);

    if (seg.numChars >= 1 << ccbits) return Infinity; // 段的长度不适合字段的位宽度
    result += 4 + ccbits + seg.bitData.length;
  }
  return result;
}
// 返回一个表示以数字模式编码的给定十进制数字字符串的段。
function makeNumeric(digits: string): QrSegment {
  if (!isNumeric(digits)) {
    throw new RangeError('String contains non-numeric characters');
  }
  const bb: number[] = [];

  for (let i = 0; i < digits.length; ) {
    // 每次迭代最多消耗3个数字
    const n: number = Math.min(digits.length - i, 3);

    appendBits(parseInt(digits.substring(i, i + n), 10), n * 3 + 1, bb);
    i += n;
  }
  return new QrSegment(QrMode.get('NUMERIC'), digits.length, bb);
}
// 返回一个表示以字母数字模式编码的给定文本字符串的段。允许的字符是：0到9、A到Z（仅大写）、空格、美元符号、百分号、星号、加号、连字符、句点、斜杠、冒号。
function makeAlphanumeric(text: string): QrSegment {
  if (!isAlphanumeric(text)) {
    throw new RangeError('String contains unencodable characters in alphanumeric mode');
  }
  const bb: number[] = [];
  let i: number;

  for (i = 0; i + 2 <= text.length; i += 2) {
    // 处理每组2个字符
    let temp = ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)) * 45;

    temp += ALPHANUMERIC_CHARSET.indexOf(text.charAt(i + 1));
    appendBits(temp, 11, bb);
  }
  // 剩下1个字符
  if (i < text.length) {
    appendBits(ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)), 6, bb);
  }
  return new QrSegment(QrMode.get('ALPHANUMERIC'), text.length, bb);
}
/*
 * QR码符号中的错误纠正级别
 */
export class Ecc {
  private constructor(
    // 在0到3范围内（无符号2位整数）。
    public readonly ordinal: IntRange<0, 4>,
    // (包私有) 在0到3范围内（无符号2位整数）。
    public readonly formatBits: IntRange<0, 4>,
  ) {}
  private static readonly LEVELS = {
    LOW: new Ecc(0, 1), // 7% 错误容忍率
    MEDIUM: new Ecc(1, 0), // 15% 错误容忍率
    QUARTILE: new Ecc(2, 3), // 25% 错误容忍率
    HIGH: new Ecc(3, 2), // 30% 错误容忍率
  } as const;
  // 获取指定级别的 ECC
  public static get(level: keyof typeof Ecc.LEVELS): Ecc {
    return Ecc.LEVELS[level];
  }
}
/*
 * 描述如何解释段的数据位。不可变。
 */
class QrMode {
  private constructor(
    // 模式指示位，是一个uint4值（范围0到15）。
    public readonly modeBits: IntRange<0, 16>,
    // 三个不同版本范围的字符计数位数。
    private readonly numBitsCharCount: readonly [number, number, number],
  ) {}
  private static readonly modes = {
    NUMERIC: new QrMode(0x1, [10, 12, 14]),
    ALPHANUMERIC: new QrMode(0x2, [9, 11, 13]),
    BYTE: new QrMode(0x4, [8, 16, 16]),
    KANJI: new QrMode(0x8, [8, 10, 12]),
    ECI: new QrMode(0x7, [0, 0, 0]),
  } as const;
  public static get(mode: keyof typeof QrMode.modes) {
    return QrMode.modes[mode];
  }
  // 范围计算
  public numCharCountBits(version: number): number {
    return this.numBitsCharCount[Math.floor((version + 7) / 17)];
  }
}

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
