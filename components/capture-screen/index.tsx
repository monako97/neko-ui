import {
  Show,
  createComponent,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  splitProps,
  untrack,
} from 'solid-js';
import { downloadBlob, isFunction } from '@moneko/common';
import { cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { style } from './style';
import { baseStyle } from '../theme';
import type { ButtonType, CustomElement } from '../index';

declare interface MediaRecorderDataAvailableEvent extends Event {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export interface CaptureScreenProps {
  class?: string;
  css?: string;
  options?: MediaStreamConstraints;
  /** 是否预览 */
  preview?: boolean;
  /** 预览时是否显示控制器 */
  controls?: boolean;
  /** 录制时配置项 */
  recorder?: boolean;
  /** 录制文件名称 */
  filename?: string;
  /** 捕获屏幕按钮文字 */
  captureScreenText?: string;
  /** 停止捕获按钮文字 */
  stopCaptureText?: string;
  /** 开始录制按钮文字 */
  startRecorderText?: string;
  /** 停止录制按钮文字 */
  stopRecorderText?: string;
  /** 暂停录制按钮文字 */
  pausedRecorderText?: string;
  /** 录制中按钮文字 */
  recorderingText?: string;
  /** 录制错误回调方法 */
  onErrorRecorder?: MediaRecorder['onerror'];
  /** 停止录制回调方法 */
  onStopRecorder?: () => void;
  /** 开始录制回调方法 */
  // eslint-disable-next-line no-unused-vars
  onStartRecorder?: (state: MediaRecorder['state']) => void;
  /** 记录媒体时触发 */
  // eslint-disable-next-line no-unused-vars
  onRecorderDataAvailable?: (e: MediaRecorderDataAvailableEvent) => void;
  /** 捕获屏幕错误回调方法 */
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onErrorCapture?: (err: any) => void;
  /** 停止捕获屏幕回调方法 */
  onStopCapture?: () => void;
  /** 开始捕获屏幕回调方法 */
  // eslint-disable-next-line no-unused-vars
  onStartCapture?: (stream?: MediaStream) => void;
  /** 自定义保存录制文件方法 */
  // eslint-disable-next-line no-unused-vars
  onSaveRecorder?: (blob: Blob, fileName: string) => void;
}
export type CaptureScreenElement = CustomElement<CaptureScreenProps>;

const displayMediaOptions: MediaStreamConstraints = {
  video: true,
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100,
  },
};

const btnStatusDic: Record<MediaRecorder['state'], ButtonType> = {
  inactive: 'primary',
  paused: 'warning',
  recording: 'success',
};

function CaptureScreen(_: CaptureScreenProps) {
  const _props = mergeProps(
    {
      options: displayMediaOptions,
      captureScreenText: '捕获屏幕',
      stopCaptureText: '停止捕获',
      startRecorderText: '开始录制',
      stopRecorderText: '停止录制',
      pausedRecorderText: '暂停录制',
      recorderingText: '录制中',
      onErrorRecorder: null,
    },
    _,
  );
  const [local, props] = splitProps(_props, [
    'options',
    'preview',
    'controls',
    'recorder',
    'filename',
    'captureScreenText',
    'stopCaptureText',
    'startRecorderText',
    'stopRecorderText',
    'pausedRecorderText',
    'recorderingText',
    'onErrorRecorder',
    'onStopRecorder',
    'onStartRecorder',
    'onStopCapture',
    'onStartCapture',
    'onRecorderDataAvailable',
    'onErrorCapture',
    'onSaveRecorder',
    'class',
  ]);
  let videoElem: HTMLVideoElement | undefined;
  const chunks: Blob[] = [];
  const [mediaRecorder, setMediaRecorder] = createSignal<MediaRecorder | null>(null);
  const [mediaStream, setMediaStream] = createSignal<MediaStream | null>(null);
  const [recordState, setRecordState] = createSignal<MediaRecorder['state']>('inactive');

  // 开始录制
  function handleStartRecorder() {
    const mr = untrack(mediaRecorder);

    if (mr) {
      if (isFunction(local.onStartRecorder)) {
        local.onStartRecorder(mr.state);
      }
      switch (mr.state) {
        case 'inactive': // 不活跃
          mr.start();
          break;
        case 'paused': // 暂停
          mr.resume();
          break;
        case 'recording': // 录制中
        default:
          mr.pause();
          break;
      }
      setRecordState(mr.state);
    }
  }
  function handleRecorderDataAvailable(e: MediaRecorderDataAvailableEvent) {
    chunks?.push(e.data as Blob);
    local.onRecorderDataAvailable?.(e);
  }
  // 停止录制
  function stopRecorder() {
    const mr = untrack(mediaRecorder);

    // 未录制时不需要停止
    if (mr) {
      if (mr.state !== 'inactive') {
        mr.stop();
      }
      setRecordState(mr.state);
    }
    local.onStopRecorder?.();
  }
  function handleSaveRecorder() {
    if (!chunks?.length) return;
    // 将录制内容保存到本地
    const blob: Blob = new Blob(chunks, {
      type: 'video/webm',
    });
    const name = local.filename || new Date().toISOString();
    const fileName = `${name}.webm`;

    chunks?.splice(0);
    if (local.onSaveRecorder) {
      local.onSaveRecorder(blob, fileName);
    }
    // 保存文件
    downloadBlob(blob, fileName);
  }

  // 停止捕获屏幕
  function stopCapture() {
    // 如果在录制则先停止
    stopRecorder();
    const ms = untrack(mediaStream);

    if (ms) {
      const tracks = ms.getTracks();

      tracks?.forEach((track: MediaStreamTrack) => track.stop());
      setMediaStream(null);
    }
    local.onStopCapture?.();
  }

  // 开始捕获屏幕
  async function startCapture() {
    stopCapture();
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        ...displayMediaOptions,
        ...local.options,
      });

      if (stream) {
        // 监听停止捕获屏幕
        stream.addEventListener('inactive', stopCapture, false);
        setMediaStream(stream);
      }
      local.onStartCapture?.(stream);
    } catch (err) {
      local.onErrorCapture?.(err);
    }
  }

  createEffect(() => {
    const ms = mediaStream();

    if (local.preview && videoElem && ms) {
      videoElem.srcObject = ms;
    }
  });

  createEffect(() => {
    const ms = mediaStream();

    if (ms?.active) {
      const recorderInstance = new MediaRecorder(ms);

      recorderInstance.onstop = handleSaveRecorder;
      recorderInstance.onerror = local.onErrorRecorder;
      // 每次timeslice记录毫秒级媒体时（或未记录整个媒体时，如果timeslice未指定）定期触发
      recorderInstance.ondataavailable = handleRecorderDataAvailable;
      setMediaRecorder(recorderInstance);
    } else {
      setMediaRecorder(null);
    }
  });

  onCleanup(() => {
    const mr = untrack(mediaRecorder);

    // 未录制时不需要停止
    if (mr && mr?.state !== 'inactive') {
      mr.stop();
    }
    const ms = untrack(mediaStream);

    if (ms) {
      const tracks = ms.getTracks();

      tracks.forEach((track: MediaStreamTrack) => track.stop());
    }
  });
  const recorderText = createMemo(() => {
    return {
      paused: local.pausedRecorderText,
      recording: local.recorderingText,
      inactive: local.startRecorderText,
    }[recordState()];
  });

  return (
    <>
      <style>
        {baseStyle()}
        {style}
      </style>
      <div class={cx('capture-screen', local.class)} {...props}>
        <div class="controller">
          <n-button onClick={startCapture} class="btn">
            {local.captureScreenText}
          </n-button>
          <Show when={mediaStream()}>
            <>
              <n-button danger={true} onClick={stopCapture} class="btn">
                {local.stopCaptureText}
              </n-button>
              <Show when={local.recorder}>
                <div class="record">
                  <n-button
                    type={btnStatusDic[recordState()]}
                    onClick={handleStartRecorder}
                    class="btn"
                  >
                    <span>{recorderText()}</span>
                  </n-button>
                  <Show when={recordState() !== 'inactive'}>
                    <n-button type="error" onClick={stopRecorder} class="btn">
                      {local.stopRecorderText}
                    </n-button>
                  </Show>
                </div>
              </Show>
            </>
          </Show>
        </div>
        <Show when={local.preview && mediaStream()}>
          <div class="view">
            <span
              class={cx(
                recordState() === 'recording' && 'recording',
                recordState() === 'paused' && 'paused',
              )}
            />
            <video ref={videoElem} autoplay controls={local.controls && mediaStream() !== null} />
          </div>
        </Show>
      </div>
    </>
  );
}

customElement(
  'n-capture-screen',
  {
    class: undefined,
    css: undefined,
    options: undefined,
    preview: undefined,
    controls: undefined,
    recorder: undefined,
    filename: undefined,
    captureScreenText: undefined,
    stopCaptureText: undefined,
    startRecorderText: undefined,
    stopRecorderText: undefined,
    pausedRecorderText: undefined,
    recorderingText: undefined,
    onErrorRecorder: undefined,
    onStopRecorder: undefined,
    onStartRecorder: undefined,
    onRecorderDataAvailable: undefined,
    onErrorCapture: undefined,
    onStopCapture: undefined,
    onStartCapture: undefined,
    onSaveRecorder: undefined,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        onErrorRecorder(e: Event) {
          el.dispatchEvent(
            new CustomEvent('recordererror', {
              detail: e,
            }),
          );
        },
        onStopRecorder() {
          el.dispatchEvent(
            new CustomEvent('stoprecorder', {
              detail: null,
            }),
          );
        },
        onStartRecorder(state: MediaRecorder['state']) {
          el.dispatchEvent(
            new CustomEvent('startrecorder', {
              detail: state,
            }),
          );
        },
        onRecorderDataAvailable(e: MediaRecorderDataAvailableEvent) {
          el.dispatchEvent(
            new CustomEvent('recorderdataavailable', {
              detail: e,
            }),
          );
        },
        onErrorCapture(e: Error) {
          el.dispatchEvent(
            new CustomEvent('errorcapture', {
              detail: e,
            }),
          );
        },
        onStopCapture() {
          el.dispatchEvent(
            new CustomEvent('stopcapture', {
              detail: null,
            }),
          );
        },
        onStartCapture(stream?: MediaStream) {
          el.dispatchEvent(
            new CustomEvent('startcapture', {
              detail: stream,
            }),
          );
        },
        onSaveRecorder(blob: Blob, fileName: string) {
          el.dispatchEvent(
            new CustomEvent('saverecorder', {
              detail: [blob, fileName],
            }),
          );
        },
      },
      _,
    );

    return createComponent(CaptureScreen, props);
  },
);

export default CaptureScreen;
