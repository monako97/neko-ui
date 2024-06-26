// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

declare interface MediaRecorderErrorEvent extends Event {
  name: string;
}

declare interface MediaRecorderDataAvailableEvent extends Event {
  data: Any;
}

interface MediaRecorderEventMap {
  dataavailable: MediaRecorderDataAvailableEvent;
  error: MediaRecorderErrorEvent;
  pause: Event;
  resume: Event;
  start: Event;
  stop: Event;
  warning: MediaRecorderErrorEvent;
}

declare class MediaRecorder extends EventTarget {
  readonly mimeType: string;
  readonly state: 'inactive' | 'recording' | 'paused';
  readonly stream: MediaStream;
  ignoreMutedMedia: boolean;
  videoBitsPerSecond: number;
  audioBitsPerSecond: number;

  ondataavailable: (event: MediaRecorderDataAvailableEvent) => void;
  onerror: (event: MediaRecorderErrorEvent) => void;
  onwarning: (event: MediaRecorderErrorEvent) => void;
  onpause: () => void;
  onresume: () => void;
  onstart: () => void;
  onstop: () => void;

  constructor(stream: MediaProvider);

  start();

  stop();

  resume();

  pause();

  isTypeSupported(type: string): boolean;

  requestData();

  addEventListener<K extends keyof MediaRecorderEventMap>(
    type: K,
    listener: (this: MediaStream, ev: MediaRecorderEventMap[K]) => Any,
    options?: boolean | AddEventListenerOptions,
  ): void;

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;

  removeEventListener<K extends keyof MediaRecorderEventMap>(
    type: K,
    listener: (this: MediaStream, ev: MediaRecorderEventMap[K]) => Any,
    options?: boolean | EventListenerOptions,
  ): void;

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

interface MediaDevices extends MediaDevices {
  getDisplayMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
}

interface CanvasRenderingContext2D
  extends CanvasCompositing,
    CanvasDrawImage,
    CanvasDrawPath,
    CanvasFillStrokeStyles,
    CanvasFilters,
    CanvasImageData,
    CanvasImageSmoothing,
    CanvasPath,
    CanvasPathDrawingStyles,
    CanvasRect,
    CanvasShadowStyles,
    CanvasState,
    CanvasText,
    CanvasTextDrawingStyles,
    CanvasTransform,
    CanvasUserInterface {
  transformedPoint: (x: number, y: number) => DOMPoint;
  readonly canvas: HTMLCanvasElement;
}
interface CSSStyleDeclaration {
  mozUserSelect: string;
}
interface WheelEvent extends MouseEvent {
  wheelDelta: number;
  preventDefault(): boolean;
}

/** FullScreen */
interface Element
  extends Node,
    Animatable,
    ChildNode,
    InnerHTML,
    NonDocumentTypeChildNode,
    ParentNode,
    Slottable {
  mozRequestFullScreen: Any;
  msRequestFullscreen: Any;
  webkitRequestFullScreen: Any;
}
interface Document
  extends Node,
    DocumentAndElementEventHandlers,
    DocumentOrShadowRoot,
    GlobalEventHandlers,
    NonElementParentNode,
    ParentNode,
    XPathEvaluatorBase {
  mozCancelFullScreen();
  msExitFullscreen();
  msExiFullscreen();
  webkitCancelFullScreen();
  webkitFullscreenElement();
  mozFullScreenElement();
}
interface EyeDropperConstructor {
  new (): EyeDropper;
}

interface ColorSelectionOptions {
  signal: AbortSignal;
}

interface ColorSelectionResult {
  sRGBHex: string;
}

interface EyeDropper extends EyeDropperConstructor {
  open: (options?: ColorSelectionOptions = {}) => Promise<ColorSelectionResult>;
}

interface Window {
  EyeDropper?: EyeDropper;
  marked: typeof import('marked-completed');
  Prism: {
    disableWorkerMessageHandler: boolean;
    languages: Record<string, unknown>;
    highlight(code: string, langs: unknown, lang: string): string;
  };
}
