import React from 'react';
import CaptureScreen from '../index';
import { render, screen, fireEvent, act } from '@testing-library/react';

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
      // eslint-disable-next-line no-unused-vars
      start: jest.fn(function (this: MediaRecorder) {
        // eslint-disable-next-line no-invalid-this
        Object.assign(this, {
          state: 'recording',
        });

        if (ondataavailable) {
          const blobEvent = { data: new Blob(), timecode: 1 } as BlobEvent;

          // eslint-disable-next-line no-invalid-this
          this.ondataavailable?.(blobEvent);
        }
      }),
      // eslint-disable-next-line no-undefined
      ondataavailable: ondataavailable ? jest.fn(() => ({ data: 0 })) : null,
      // eslint-disable-next-line no-unused-vars
      onerror: jest.fn(function (this: MediaRecorder) {
        // eslint-disable-next-line no-invalid-this
        Object.assign(this, {
          state: 'error',
        });
      }),
      state: 'inactive',
      // eslint-disable-next-line no-unused-vars
      stop: jest.fn(function (this: MediaRecorder) {
        // eslint-disable-next-line no-invalid-this
        Object.assign(this, {
          state: 'inactive',
        });
        // eslint-disable-next-line no-invalid-this, @typescript-eslint/no-non-null-assertion
        this.onstop?.(window.event!);
      }),
      onstop: jest.fn(),
      // eslint-disable-next-line no-unused-vars
      pause: jest.fn(function (this: MediaRecorder) {
        // eslint-disable-next-line no-invalid-this
        Object.assign(this, {
          state: 'paused',
        });
      }),
      // eslint-disable-next-line no-unused-vars
      resume: jest.fn(function (this: MediaRecorder) {
        // eslint-disable-next-line no-invalid-this
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

/**
 * @jest-environment jsdom
 */
describe('test CaptureScreen', () => {
  it('not supports', async () => {
    const onErrorCapture = jest.fn();

    render(<CaptureScreen onErrorCapture={onErrorCapture} />);

    await act(async () => {
      fireEvent.click(screen.getByText('捕获屏幕'));
    });
    expect(onErrorCapture).toHaveBeenCalled();
  });
  it('basic', () => {
    const { container } = render(<CaptureScreen />);

    expect(container).toBeInTheDocument();
  });
  it('event', async () => {
    mockMedia();
    render(
      <CaptureScreen
        id="CaptureScreen"
        className="CaptureScreen"
        captureScreenText="捕获屏幕"
        stopCaptureText="停止捕获"
        recorderingText="recorderingText"
        stopRecorderText="stopRecorderText"
        pausedRecorderText="pausedRecorderText"
        startRecorderText="开始录制"
        options={{}}
        controls
        recorder
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByText('捕获屏幕'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('开始录制'));
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

    render(
      <CaptureScreen
        onStartCapture={onStartCapture}
        onRecorderDataAvailable={onRecorderDataAvailable}
        onRecorderError={onRecorderError}
        onStopCapture={onStopCapture}
        onStopRecorder={onStopRecorder}
        onStartRecorder={onStartRecorder}
        recorder={{ filename: '录制文件' }}
        preview
      />
    );
    await act(async () => {
      fireEvent.click(screen.getByText('捕获屏幕'));
    });
    expect(onStartCapture).toHaveBeenCalled();
    await act(async () => {
      fireEvent.click(screen.getByText('开始录制'));
    });
    expect(onStartRecorder).toHaveBeenCalled();
    await act(async () => {
      fireEvent.click(screen.getByText('停止捕获'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('捕获屏幕'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('开始录制'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('录制中'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('暂停录制'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('停止录制'));
    });
    expect(onStopRecorder).toHaveBeenCalled();
    fireEvent.click(screen.getByText('停止捕获'));
    expect(onStopCapture).toHaveBeenCalled();
  });

  it('supports recorder and custom onSaveRecorder', async () => {
    mockMedia(true);
    const onSaveRecorder = jest.fn();

    render(<CaptureScreen recorder onSaveRecorder={onSaveRecorder} />);
    await act(async () => {
      fireEvent.click(screen.getByText('捕获屏幕'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('开始录制'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('停止捕获'));
    });
    expect(onSaveRecorder).toHaveBeenCalled();
  });
});
