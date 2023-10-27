import { createComponent, createEffect, mergeProps, onCleanup, onMount } from 'solid-js';
import {
  type AssetLoadCallback,
  type Layout,
  Rive as RiveCanvas,
  type RiveParameters,
  RuntimeLoader,
} from '@rive-app/canvas';
import riveWASM from '@rive-app/canvas/rive.wasm?url';
import { customElement } from 'solid-element';

RuntimeLoader.setWasmUrl(riveWASM);

/**
 * API
 * @since 2.6.0
 */
export interface RiveProps extends Omit<RiveParameters, 'canvas'> {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 动画资源地址 */
  src?: string;
  buffer?: ArrayBuffer;
  artboard?: string;
  animations?: string | string[];
  stateMachines?: string | string[];
  layout?: Layout;
  autoplay?: boolean;
  useOffscreenRenderer?: boolean;
  /**
   * 允许运行时自动加载 Rive CDN 中托管的资源
   * @default true
   */
  enableRiveAssetCDN?: boolean;
  /**
   * 关闭 Rive 监听器。
   * 这意味着有监听器的状态机不会被调用，
   * 并且也没有与 Listeners 相关的事件监听器将附加到 `<canvas>` 元素
   */
  shouldDisableRiveListeners?: boolean;
  /**
   * 启用运行时处理 Rive 事件。这意味着任何特殊的 Rive 活动都可能有隐式发生的副作用。
   * 例如，如果在渲染循环期间检测到 OpenUrlEvent，则浏览器可能会尝试打开有效负载中指定的 URL。
   * 任何特殊的 Rive 活动都必须通过订阅来手动处理事件类型 RiveEvent
   * @default false
   */
  automaticallyHandleEvents?: boolean;
  onLoad?(e: Event): void;
  onLoadError?(e: Event): void;
  onPlay?(e: Event): void;
  onPause?(e: Event): void;
  onStop?(e: Event): void;
  onLoop?(e: Event): void;
  onStateChange?(e: Event): void;
  onAdvance?(e: Event): void;
  assetLoader?: AssetLoadCallback;
}
/**
 * 事件类型
 */
export enum EventType {
  /** 加载 */
  Load = 'load',
  /** 加载错误 */
  LoadError = 'loaderror',
  /** 播放 */
  Play = 'play',
  /** 暂停 */
  Pause = 'pause',
  /** 停止 */
  Stop = 'stop',
  /** 循环 */
  Loop = 'loop',
  Draw = 'draw',
  Advance = 'advance',
  /** 状态变更 */
  StateChange = 'statechange',
  RiveEvent = 'riveevent',
}
export interface Event {
  type: EventType;
  data?: string | string[] | LoopEvent | number | RiveEvent | OpenUrlEvent;
}
/**
 * Rive 事件接口
 * @description 用于在 Rive 编辑器中定义的 `General` 自定义事件。每个事件都有一个名称和可选的一些其他自定义属性和类型
 */
export interface RiveEvent {
  /**
   * 事件名称
   */
  name: string;
  /**
   * 触发的特定事件类型的可选类型 (即 General, OpenUrl)
   */
  type?: number;
  /**
   * 在事件上定义的可选自定义属性
   */
  properties?: Record<string, number | boolean | string>;
  /**
   * 自事件具体发生以来可选的经过时间
   */
  delay?: number;
}
/**
 * OpenUrl 事件特定的 Rive 事件接口。
 * @description 该事件接口有一个 `URL` 和一个可选的 `target` 属性来指示如何打开 `URL`
 */
export interface OpenUrlEvent extends RiveEvent {
  /** 调用事件时打开的 `URL` */
  url: string;
  /** 在哪里显示链接的 `URL` */
  target?: string;
}
/**
 * 循环事件
 * @description 通过 `onLoop` 回调返回
 */
export interface LoopEvent {
  animation: string;
  type: LoopType;
}
/** 循环类型 */
export enum LoopType {
  /** 单发 */
  OneShot = 'oneshot',
  /** 循环 */
  Loop = 'loop',
  /** 乒乓球 */
  PingPong = 'pingpong',
}
function Rive(props: RiveProps) {
  let el: HTMLCanvasElement | undefined;
  let instance: RiveCanvas;
  const params = mergeProps(
    {
      onLoad: () => {
        instance.resizeDrawingSurfaceToCanvas();
      },
    },
    props,
  );

  onMount(() => {
    instance = new RiveCanvas({
      ...params,
      canvas: el!,
    });
  });
  createEffect(() => {
    instance.stateMachineInputs('10');
  });
  onCleanup(() => {
    instance.cleanup();
    instance.cleanupInstances();
  });
  return <canvas ref={el} />;
}

export type RiveElement = CustomElement<RiveProps>;

customElement<RiveProps>(
  'n-rive',
  {
    class: void 0,
    css: void 0,
    src: void 0,
    buffer: void 0,
    artboard: void 0,
    animations: void 0,
    stateMachines: void 0,
    layout: void 0,
    autoplay: void 0,
    useOffscreenRenderer: void 0,
    enableRiveAssetCDN: void 0,
    shouldDisableRiveListeners: void 0,
    automaticallyHandleEvents: void 0,
    onLoad: void 0,
    onLoadError: void 0,
    onPlay: void 0,
    onPause: void 0,
    onStop: void 0,
    onLoop: void 0,
    onStateChange: void 0,
    onAdvance: void 0,
    assetLoader: void 0,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        onLoad(e: Event) {
          el.dispatchEvent(
            new CustomEvent('load', {
              detail: e,
            }),
          );
        },
      },
      _,
    );

    createEffect(() => {
      el.removeAttribute('css');
    });
    return createComponent(Rive, props);
  },
);
export default Rive;
