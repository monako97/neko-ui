type FakeMouseEventInit = Partial<{
  bubbles: boolean;
  cancelable: boolean;
  composed: boolean;
  altKey: boolean;
  button: 0 | 1 | 2 | 3 | 4;
  buttons: number;
  clientX: number;
  clientY: number;
  ctrlKey: boolean;
  metaKey: boolean;
  movementX: number;
  movementY: number;
  offsetX: number;
  offsetY: number;
  pageX: number;
  pageY: number;
  screenX: number;
  screenY: number;
  shiftKey: boolean;
  x: number;
  y: number;
  nativeEvent: FakeMouseEventInit;
}>;

class FakeMouseEvent extends MouseEvent {
  offsetX = 0;
  offsetY = 0;
  pageX = 0;
  pageY = 0;
  x = 0;
  y = 0;
  nativeEvent = {};

  constructor(type: string, values: FakeMouseEventInit) {
    const {
      pageX,
      pageY,
      offsetX,
      offsetY,
      x,
      y,
      nativeEvent,
      movementX,
      movementY,
      ...mouseValues
    } = values;

    super(type, mouseValues);

    Object.assign(this, {
      offsetX: offsetX || 0,
      offsetY: offsetY || 0,
      pageX: pageX || 0,
      pageY: pageY || 0,
      x: x || 0,
      y: y || 0,
      nativeEvent: nativeEvent || {},
      movementX: movementX || 0,
      movementY: movementY || 0,
    });
  }
}

Object.defineProperty(window, 'MouseEvent', {
  writable: true,
  value: FakeMouseEvent,
});
Object.defineProperty(window, 'FakeMouseEvent', {
  writable: true,
  value: FakeMouseEvent,
});
