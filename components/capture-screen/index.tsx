import {
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  Show,
  splitProps,
  untrack,
} from 'solid-js';
import { downloadBlob, isFunction } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import { clearAttribute } from '../basic-config';
import Button from '../button';
import theme, { inline } from '../theme';

import { style } from './style';

declare interface MediaRecorderDataAvailableEvent extends Event {
  /** MediaRecorderDataAvailableEvent */
  data: Any;
}

export interface CaptureScreenProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** MediaStreamConstraints */
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
  onErrorRecorder?: (e: Event) => void;
  /** 停止录制回调方法 */
  onStopRecorder?: () => void;
  /** 开始录制回调方法 */
  onStartRecorder?: (state: MediaRecorder['state']) => void;
  /** 记录媒体时触发 */
  onRecorderDataAvailable?: (e: MediaRecorderDataAvailableEvent) => void;
  /** 捕获屏幕错误回调方法 */
  onErrorCapture?: (err: unknown) => void;
  /** 停止捕获屏幕回调方法 */
  onStopCapture?: () => void;
  /** 开始捕获屏幕回调方法 */
  onStartCapture?: (stream?: MediaStream) => void;
  /** 自定义保存录制文件方法 */
  onSaveRecorder?: (blob: Blob, fileName: string) => void;
}
export type CaptureScreenElement = CustomElement<
  CaptureScreenProps,
  | 'onErrorRecorder'
  | 'onStopRecorder'
  | 'onStartRecorder'
  | 'onRecorderDataAvailable'
  | 'onErrorCapture'
  | 'onStopCapture'
  | 'onStartCapture'
  | 'onSaveRecorder'
>;

const displayMediaOptions: MediaStreamConstraints = {
  video: true,
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100,
  },
};

const btnStatusDic: Record<MediaRecorder['state'], 'primary' | 'warning' | 'success'> = {
  inactive: 'primary',
  paused: 'warning',
  recording: 'success',
};

function CaptureScreen(_: CaptureScreenProps) {
  const { baseStyle } = theme;
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
    'css',
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
        // case 'recording': // 录制中
        default:
          mr.pause();
          break;
      }
      setRecordState(mr.state);
    }
  }
  function handleRecorderDataAvailable(e: MediaRecorderDataAvailableEvent) {
    chunks.push(e.data as Blob);
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
    if (!chunks.length) return;
    // 将录制内容保存到本地
    const blob: Blob = new Blob(chunks, {
      type: 'video/webm',
    });
    const name = local.filename || new Date().toISOString();
    const fileName = `${name}.webm`;

    chunks.splice(0);
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

      tracks.forEach((track: MediaStreamTrack) => {
        track.stop();
      });
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
    if (mr && mr.state !== 'inactive') {
      mr.stop();
    }
    const ms = untrack(mediaStream);

    if (ms) {
      const tracks = ms.getTracks();

      tracks.forEach((track: MediaStreamTrack) => {
        track.stop();
      });
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
      <style textContent={baseStyle()} />
      <style textContent={style} />
      <Show when={local.css}>
        <style textContent={css(local.css)} />
      </Show>
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
              classList={{
                recording: recordState() === 'recording',
                paused: recordState() === 'paused',
              }}
            />
            <video ref={videoElem} autoplay controls={local.controls && mediaStream() !== null} />
          </div>
        </Show>
      </div>
    </>
  );
}

CaptureScreen.registry = () => {
  Button.registry();
  customElement<CaptureScreenProps>(
    'n-capture-screen',
    {
      class: void 0,
      css: void 0,
      options: void 0,
      preview: void 0,
      controls: void 0,
      recorder: void 0,
      filename: void 0,
      captureScreenText: void 0,
      stopCaptureText: void 0,
      startRecorderText: void 0,
      stopRecorderText: void 0,
      pausedRecorderText: void 0,
      recorderingText: void 0,
      onErrorRecorder: void 0,
      onStopRecorder: void 0,
      onStartRecorder: void 0,
      onRecorderDataAvailable: void 0,
      onErrorCapture: void 0,
      onStopCapture: void 0,
      onStartCapture: void 0,
      onSaveRecorder: void 0,
    },
    (_, opt) => {
      const el = opt.element;
      const props = mergeProps(
        {
          onErrorRecorder(e: Event) {
            el.dispatchEvent(
              new CustomEvent('errorrecorder', {
                detail: e,
              }),
            );
          },
          onStopRecorder() {
            el.dispatchEvent(
              new CustomEvent('stoprecorder', {
                detail: void 0,
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
          onErrorCapture(e: unknown) {
            el.dispatchEvent(
              new CustomEvent('errorcapture', {
                detail: e,
              }),
            );
          },
          onStopCapture() {
            el.dispatchEvent(
              new CustomEvent('stopcapture', {
                detail: void 0,
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

      createEffect(() => {
        clearAttribute(el, ['css', 'options']);
      });
      return (
        <>
          <style textContent={inline} />
          <CaptureScreen {...props} />
        </>
      );
    },
  );
};
export default CaptureScreen;
