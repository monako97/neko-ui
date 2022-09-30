import {
  getType,
  isEqual,
  isFunction,
  isNull,
  isObject,
  isUndefined,
  objectTag,
  arrayTag,
  stringTag,
  numberTag,
  mapTag,
  setTag,
  boolTag,
  dateTag,
  symbolTag,
  errorTag,
  regexpTag,
  funcTag,
  asyncTag,
  genTag,
} from '../type';

test('测试 getType', () => {
  expect(objectTag).toBe(getType({ a: 1 }));
  expect(arrayTag).toBe(getType(Array([1, 2])));
  expect(stringTag).toBe(getType(''));
  expect(numberTag).toBe(getType(1));
  expect(mapTag).toBe(getType(new Map()));
  expect(setTag).toBe(getType(new Set()));
  expect(boolTag).toBe(getType(true));
  expect(dateTag).toBe(getType(new Date()));
  expect(symbolTag).toBe(getType(Symbol('')));
  expect(errorTag).toBe(getType(Error('')));
  expect(regexpTag).toBe(getType(RegExp('')));
  expect(funcTag).toBe(getType(() => false));
  expect(asyncTag).toBe(getType(async () => false));
  expect(genTag).toBe(
    getType(
      {
        *names() {
          yield;
          return false;
        },
      }.names
    )
  );
});

test('测试 isEqual', () => {
  const a = { a: 1 };
  const res = isEqual(a, a);

  expect(true).toBe(res);
});

test('测试 isFunction', () => {
  const res = isFunction({ a: 1 });

  expect(false).toBe(res);
  const fn = isFunction(() => false);

  expect(true).toBe(fn);
});

test('测试 isNull', () => {
  const res = isNull({ a: 1 });

  expect(false).toBe(res);
  const fn = isNull(null);

  expect(true).toBe(fn);
});

test('测试 isObject', () => {
  const res = isObject('s');

  expect(false).toBe(res);
  const fn = isObject({ a: 1 });

  expect(true).toBe(fn);
});

test('测试 isUndefined', () => {
  const res = isUndefined({ a: 1 });

  expect(false).toBe(res);
  // eslint-disable-next-line no-undefined
  const fn = isUndefined(undefined);

  expect(true).toBe(fn);
});
