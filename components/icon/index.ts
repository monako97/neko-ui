/**
 * API
 */
export interface IconAttribute extends Omit<SvgAttribute, 'qualifiedName'> {
  /**
   * viewBox 属性允许指定一个给定的一组图形伸展以适应特定的容器元素
   * @default '0 0 1024 1024'
   */
  viewBox?: string;
}

interface SvgAttribute {
  /**
   * width 属性在用户坐标系统中定义了元素的一个水平长度
   * @default '1em'
   */
  width?: string;
  /**
   * height 属性在用户坐标系统中标识了一个垂直长度
   * @default '1em'
   */
  height?: string;
  /**
   * @default 'currentcolor'
   */
  fill?: string;
  /**
   * 子元素配置
   */
  children?: SvgAttribute[];
  /**
   * 子元素修飾名
   */
  qualifiedName?: keyof SVGElementTagNameMap;
  id?: string;
  d?: string;
  opacity?: string;
  offset?: string;
  x?: string;
  y?: string;
  [key: string]: string | SvgAttribute[] | undefined;
}
const xmlns = 'http://www.w3.org/2000/svg';

function parseAttr(opt: SvgAttribute, parent: SVGElement) {
  const { children, qualifiedName, ...attrs } = opt;
  let qualified = parent;

  if (qualifiedName) {
    qualified = document.createElementNS(xmlns, qualifiedName as string);
    parent.appendChild(qualified);
  }
  if (Array.isArray(children) && children.length) {
    children.forEach((child) => {
      parseAttr(child, qualified);
    });
  }
  for (const key in attrs) {
    if (Object.prototype.hasOwnProperty.call(attrs, key)) {
      qualified.setAttribute(key, attrs[key] as string);
    }
  }
}

function icon(option: IconAttribute) {
  const svg = document.createElementNS(xmlns, 'svg');

  parseAttr(
    Object.assign(
      {
        viewBox: '0 0 1024 1024',
        height: '1em',
        width: '1em',
        fill: 'currentcolor',
      },
      option,
    ),
    svg,
  );
  return svg;
}

export default icon;
