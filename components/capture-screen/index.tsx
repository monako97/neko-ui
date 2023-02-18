import React, {
  type FC,
  type HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { css, injectGlobal } from '@emotion/css';
import { classNames, downloadBlob, isObject } from '@moneko/common';
import { Button, type ButtonProps } from '../index';
import prefixCls from '../prefix-cls';

const cls = {
  captureScreen: prefixCls('capture-screen'),
  view: prefixCls('capture-screen-view'),
  recording: prefixCls('capture-screen-recording'),
  paused: prefixCls('capture-screen-paused'),
  record: prefixCls('capture-screen-record'),
  controller: prefixCls('capture-screen-controller'),
  btn: prefixCls('capture-screen-btn'),
};
const captureScreenCss = css`
  .${cls.captureScreen} {
    display: block;
  }
  .${cls.view} {
    position: relative;
  }
  .${cls.view} video {
    border: var(--border-base);
    border-radius: var(--border-radius, 8px);
    width: 100%;
    transition: border-color var(--transition-duration) var(--transition-timing-function);
  }
  .${cls.recording}, .${cls.paused} {
    position: absolute;
    top: 5px;
    right: 5px;
    border-radius: 50%;
    width: 10px;
    height: 10px;
  }
  .${cls.recording} {
    background-color: var(--success-color, #52c41a);
    animation: record-fade-loop-effect 2s infinite;
  }
  .${cls.paused} {
    background-color: var(--warning-color, #faad14);
  }
  .${cls.controller} {
    display: flex;
    margin: 16px 0;
  }
  .${cls.btn} {
    margin-right: 16px;
  }
  .${cls.record} {
    display: flex;
    margin-left: 16px;

    &::before {
      display: block;
      border-left: 1px solid var(--border-color, #d9d9d9);
      height: 100%;
      transition: border-color var(--transition-duration) var(--transition-timing-function);
      transform: translateX(-16px);
      content: '';
    }
  }

  @keyframes record-fade-loop-effect {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;

injectGlobal([captureScreenCss]);

export interface RecorderOptions {
  /** 录制文件名称 */
  filename?: string;
}
export interface CaptureScreenProp extends HTMLAttributes<HTMLDivElement> {
  options?: MediaStreamConstraints;
  /** 是否预览 */
  preview?: boolean;
  /** 预览时是否显示控制器 */
  controls?: boolean;
  /** 录制时配置项 */
  recorder?: boolean | RecorderOptions;
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
  onRecorderError?: MediaRecorder['onerror'];
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

const displayMediaOptions: MediaStreamConstraints = {
  video: true,
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100,
  },
};

const btnStatusDic: Record<MediaRecorder['state'], ButtonProps['type']> = {
  inactive: 'primary',
  paused: 'warning',
  recording: 'success',
};
const CaptureScreen: FC<CaptureScreenProp> = ({
  options = displayMediaOptions,
  preview,
  controls,
  recorder,
  captureScreenText = '捕获屏幕',
  stopCaptureText = '停止捕获',
  startRecorderText = '开始录制',
  stopRecorderText = '停止录制',
  pausedRecorderText = '暂停录制',
  recorderingText = '录制中',
  onRecorderError = null,
  onStopRecorder,
  onStartRecorder,
  onStopCapture,
  onStartCapture,
  onRecorderDataAvailable,
  onErrorCapture,
  onSaveRecorder,
  className,
  ...props
}) => {
  const videoElem = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder>(null);
  const mediaStreamRef = useRef<MediaStream>(null);
  const chunks = useRef<Blob[]>([]);
  const recorderRef = useRef<CaptureScreenProp['recorder']>(recorder);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [recordState, setRecordState] = useState<MediaRecorder['state']>('inactive');

  useEffect(() => {
    Object.assign(recorderRef, {
      current: recorder,
    });
  }, [recorder]);
  useEffect(() => {
    Object.assign(mediaStreamRef, {
      current: mediaStream,
    });
  }, [mediaStream]);
  useEffect(() => {
    Object.assign(mediaRecorderRef, {
      current: mediaRecorder,
    });
  }, [mediaRecorder]);

  // 开始录制
  const handleStartRecorder = useCallback(() => {
    if (mediaRecorderRef.current) {
      onStartRecorder?.(mediaRecorderRef.current.state);
      switch (mediaRecorderRef.current.state) {
        case 'inactive': // 不活跃
          mediaRecorderRef.current.start();
          break;
        case 'paused': // 暂停
          mediaRecorderRef.current.resume();
          break;
        case 'recording': // 录制中
        default:
          mediaRecorderRef.current.pause();
          break;
      }
      setRecordState(mediaRecorderRef.current.state);
    }
  }, [onStartRecorder]);
  const handleRecorderDataAvailable = useCallback(
    (e: MediaRecorderDataAvailableEvent) => {
      chunks.current?.push(e.data as Blob);
      onRecorderDataAvailable?.(e);
    },
    [onRecorderDataAvailable]
  );
  // 停止录制
  const stopRecorder = useCallback(() => {
    // 未录制时不需要停止
    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setRecordState(mediaRecorderRef.current.state);
    }
    onStopRecorder?.();
  }, [onStopRecorder]);
  const handleSaveRecorder = useCallback(() => {
    if (!chunks.current?.length) return;
    // 将录制内容保存到本地
    const { current } = recorderRef;
    const blob: Blob = new Blob(chunks.current, {
      type: 'video/webm',
    });
    const name = isObject(current) ? current?.filename : new Date().toISOString();
    const fileName: string = name + '.webm';

    chunks.current?.splice(0);
    if (onSaveRecorder) {
      onSaveRecorder(blob, fileName);
    } else {
      // 保存文件
      downloadBlob(blob, fileName);
    }
  }, [onSaveRecorder]);

  // 停止捕获屏幕
  const stopCapture = useCallback(() => {
    // 如果在录制则先停止
    stopRecorder();
    if (mediaStreamRef.current) {
      const tracks = mediaStreamRef.current.getTracks();

      tracks?.forEach((track: MediaStreamTrack) => track.stop());
      setMediaStream(null);
    }
    onStopCapture?.();
  }, [onStopCapture, stopRecorder]);

  // 开始捕获屏幕
  const startCapture = useCallback(async () => {
    stopCapture();
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        ...displayMediaOptions,
        ...options,
      });

      if (stream) {
        // 监听停止捕获屏幕
        stream.addEventListener('inactive', stopCapture, false);
        setMediaStream(stream);
      }
      onStartCapture?.(stream);
    } catch (err) {
      onErrorCapture?.(err);
    }
  }, [onErrorCapture, onStartCapture, options, stopCapture]);

  useEffect(() => {
    if (preview && videoElem?.current && mediaStream) {
      videoElem.current.srcObject = mediaStream;
    }
  }, [mediaStream, preview]);

  useEffect(() => {
    if (mediaStream?.active) {
      const recorderInstance = new MediaRecorder(mediaStream);

      recorderInstance.onstop = handleSaveRecorder;
      recorderInstance.onerror = onRecorderError;
      // 每次timeslice记录毫秒级媒体时（或未记录整个媒体时，如果timeslice未指定）定期触发
      recorderInstance.ondataavailable = handleRecorderDataAvailable;
      setMediaRecorder(recorderInstance);
    } else {
      setMediaRecorder(null);
    }
  }, [handleRecorderDataAvailable, handleSaveRecorder, mediaStream, onRecorderError]);

  useEffect(() => {
    const getMediaRecorderRef = () => mediaRecorderRef.current;
    const getMediaStreamRef = () => mediaStreamRef.current;

    return () => {
      const _mediaRecorderRef = getMediaRecorderRef();

      // 未录制时不需要停止
      if (_mediaRecorderRef?.state !== 'inactive') {
        _mediaRecorderRef?.stop();
      }
      const streamRef = getMediaStreamRef();

      if (streamRef) {
        const tracks = streamRef.getTracks();

        tracks?.forEach((track: MediaStreamTrack) => track.stop());
      }
    };
  }, []);
  const recorderText = useMemo(
    () =>
      ({
        paused: pausedRecorderText,
        recording: recorderingText,
        inactive: startRecorderText,
      }[recordState]),
    [pausedRecorderText, recordState, recorderingText, startRecorderText]
  );

  return (
    <div {...props} className={classNames(cls.captureScreen, className)}>
      <div className={cls.controller}>
        <Button onClick={startCapture} className={cls.btn}>
          {captureScreenText}
        </Button>
        {mediaStream && (
          <>
            <Button type="error" onClick={stopCapture} className={cls.btn}>
              {stopCaptureText}
            </Button>
            {recorder && (
              <div className={cls.record}>
                <Button
                  type={btnStatusDic[recordState]}
                  onClick={handleStartRecorder}
                  className={cls.btn}
                >
                  {recorderText}
                </Button>
                {recordState !== 'inactive' && (
                  <Button type="error" onClick={stopRecorder} className={cls.btn}>
                    {stopRecorderText}
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
      {preview && mediaStream ? (
        <div className={cls.view}>
          <span
            className={classNames(
              recordState === 'recording' && cls.recording,
              recordState === 'paused' && cls.paused
            )}
          />
          <video ref={videoElem} autoPlay controls={!!(mediaStream && controls)} />
        </div>
      ) : null}
    </div>
  );
};

export default CaptureScreen;
