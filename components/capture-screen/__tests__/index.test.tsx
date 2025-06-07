import { fireEvent, render, waitFor } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';
const mockMedia = (ondataavailable?: boolean) => {
  global.URL.revokeObjectURL = jest.fn(() => '');
  global.URL.createObjectURL = jest.fn(() => '');
  const mediaDevicesMock = {
    getDisplayMedia: jest.fn().mockImplementation(() => ({
      start: jest.fn(),
      ondataavailable: jest.fn(),
      onerror: jest.fn(),
      state: '',
      stop: jest.fn(),
      addEventListener: jest.fn(),
      getTracks: jest.fn(() => [{ stop: () => 0 }]),
      active: true,
    })),
    getUserMedia: jest.fn(() => {
      return Promise.resolve({
        getVideoTracks: function () {
          return [{ stop: () => 0 }];
        },
      });
    }),
  };

  Object.defineProperty(navigator, 'mediaDevices', {
    writable: true,
    value: mediaDevicesMock,
  });
  Object.defineProperty(window, 'MediaRecorder', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      start: jest.fn(function (this: MediaRecorder) {
        Object.assign(this, {
          state: 'recording',
        });

        if (ondataavailable) {
          const blobEvent = { data: new Blob(), timecode: 1 } as BlobEvent;

          this.ondataavailable?.(blobEvent);
        }
      }),
      ondataavailable: ondataavailable ? jest.fn(() => ({ data: 0 })) : null,
      onerror: jest.fn(function (this: MediaRecorder) {
        Object.assign(this, {
          state: 'error',
        });
      }),
      state: 'inactive',
      stop: jest.fn(function (this: MediaRecorder) {
        Object.assign(this, {
          state: 'inactive',
        });

        this.onstop?.(window.event!);
      }),
      onstop: jest.fn(),
      pause: jest.fn(function (this: MediaRecorder) {
        Object.assign(this, {
          state: 'paused',
        });
      }),
      resume: jest.fn(function (this: MediaRecorder) {
        Object.assign(this, {
          state: 'recording',
        });
      }),
    })),
  });

  Object.defineProperty(MediaRecorder, 'isTypeSupported', {
    writable: true,
    value: () => true,
  });
};

describe('CaptureScreen', () => {
  it('not supports', async () => {
    const onErrorCapture = jest.fn();

    render(() => <n-capture-screen onErrorCapture={onErrorCapture} />);

    await waitFor(async () => {
      fireEvent.click(screen.getByShadowText('捕获屏幕'));
    });
    expect(onErrorCapture).toHaveBeenCalled();
  });
  it('basic', () => {
    const { container } = render(() => <n-capture-screen />);

    expect(container).toBeInTheDocument();
  });
  it('event', async () => {
    mockMedia();
    render(() => (
      <n-capture-screen
        class="CaptureScreen"
        capture-screen-text="捕获屏幕"
        stop-capture-text="停止捕获"
        recordering-text="recorderingText"
        stop-recorder-text="stopRecorderText"
        paused-recorder-text="pausedRecorderText"
        start-recorder-text="开始录制"
        options={{}}
        controls={true}
        recorder={true}
      />
    ));

    await waitFor(async () => {
      fireEvent.click(screen.getByShadowText('捕获屏幕'));
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByShadowText('开始录制'));
    });
  });
  it('supports', async () => {
    mockMedia(true);
    const onStartCapture = jest.fn();
    const onRecorderDataAvailable = jest.fn();
    const onRecorderError = jest.fn();
    const onStopCapture = jest.fn();
    const onStopRecorder = jest.fn();
    const onStartRecorder = jest.fn();

    render(() => (
      <n-capture-screen
        onStartCapture={onStartCapture}
        onRecorderDataAvailable={onRecorderDataAvailable}
        onErrorRecorder={onRecorderError}
        onStopCapture={onStopCapture}
        onStopRecorder={onStopRecorder}
        onStartRecorder={onStartRecorder}
        recorder={true}
        preview={true}
      />
    ));
    await waitFor(async () => {
      fireEvent.click(screen.getByShadowText('捕获屏幕'));
    });
    expect(onStartCapture).toHaveBeenCalled();
    await waitFor(async () => {
      fireEvent.click(screen.getByShadowText('开始录制'));
    });
    expect(onStartRecorder).toHaveBeenCalled();
    await waitFor(async () => {
      fireEvent.click(screen.getByShadowText('停止捕获'));
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByShadowText('捕获屏幕'));
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByShadowText('开始录制'));
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByShadowText('录制中'));
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByShadowText('暂停录制'));
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByShadowText('停止录制'));
    });
    expect(onStopRecorder).toHaveBeenCalled();
    fireEvent.click(screen.getByShadowText('停止捕获'));
    expect(onStopCapture).toHaveBeenCalled();
  });

  it('supports recorder and custom onSaveRecorder', async () => {
    mockMedia(true);
    const onSaveRecorder = jest.fn();

    render(() => <n-capture-screen recorder={true} onSaveRecorder={onSaveRecorder} />);
    await waitFor(async () => {
      fireEvent.click(screen.getByShadowText('捕获屏幕'));
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByShadowText('开始录制'));
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByShadowText('停止捕获'));
    });
    expect(onSaveRecorder).toHaveBeenCalled();
  });
});
