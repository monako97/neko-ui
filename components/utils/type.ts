export const mapTag = '[object Map]';
export const setTag = '[object Set]';
export const arrayTag = '[object Array]';
export const objectTag = '[object Object]';
export const boolTag = '[object Boolean]';
export const dateTag = '[object Date]';
export const numberTag = '[object Number]';
export const stringTag = '[object String]';
export const symbolTag = '[object Symbol]';
export const errorTag = '[object Error]';
export const regexpTag = '[object RegExp]';
export const funcTag = '[object Function]';
export const asyncTag = '[object AsyncFunction]';
export const genTag = '[object GeneratorFunction]';
const proxyTag = '[object Proxy]';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getType(target: any): string {
  return Object.prototype.toString.call(target);
}
export function isObject(target: unknown): boolean {
  const type = typeof target;

  return target !== null && (type == 'object' || type == 'function');
}

export function isNull(target: unknown): target is null {
  return target === null;
}

export function isUndefined(target: unknown): target is undefined {
  return 'undefined' === typeof target;
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
export function isFunction(target: any): target is (...args: any[]) => any {
  if (!isObject(target)) {
    return false;
  }
  const tagType = getType(target);

  return tagType == funcTag || tagType == asyncTag || tagType == genTag || tagType == proxyTag;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEqual(val1: any, val2: any) {
  return Object.is(val1, val2);
}
