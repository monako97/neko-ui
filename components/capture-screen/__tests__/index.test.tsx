import React from 'react';
import CaptureScreen from '../index';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */
test('测试 CaptureScreen', () => {
  const { container } = render(<CaptureScreen />);

  expect(container).toBeInTheDocument();
});

/**
 * @jest-environment jsdom
 */
test('测试 CaptureScreen 事件', async () => {
  const onErrorCapture = jest.fn();

  const { container } = render(
    <CaptureScreen
      className="CaptureScreen"
      onErrorCapture={onErrorCapture}
      options={{}}
      recorder
      preview
      controls
    />
  );

  expect(container.querySelector('.CaptureScreen')).toBeInTheDocument();
  act(() => {
    fireEvent.click(screen.getByText('捕获屏幕'));
  });

  // await waitFor(() => screen.getByText('捕获屏幕'));
  expect(onErrorCapture).toHaveBeenCalled();
});

/**
 * @jest-environment jsdom
 */
test('测试 CaptureScreen 事件', async () => {
  const onStartCapture = jest.fn();
  const onRecorderDataAvailable = jest.fn();
  const onRecorderError = jest.fn();
  const onStartRecorder = jest.fn();
  const onStopCapture = jest.fn();
  const onStopRecorder = jest.fn();
  const mediaDevicesMock = {
    getDisplayMedia: jest.fn().mockImplementation(() => ({
      start: jest.fn(),
      ondataavailable: jest.fn(),
      onerror: jest.fn(),
      state: '',
      stop: jest.fn(),
      addEventListener: jest.fn(),
    })),
    getUserMedia: jest.fn(() => {
      return Promise.resolve({
        getVideoTracks: function () {
          return [];
        },
      });
    }),
  };

  Object.defineProperty(navigator, 'mediaDevices', {
    writable: true,
    value: mediaDevicesMock,
  });
  render(
    <CaptureScreen
      onStartCapture={onStartCapture}
      onRecorderDataAvailable={onRecorderDataAvailable}
      onRecorderError={onRecorderError}
      onStartRecorder={onStartRecorder}
      onStopCapture={onStopCapture}
      onStopRecorder={onStopRecorder}
      options={{}}
      recorder
      preview
      captureScreenText="捕获屏幕"
      stopCaptureText="停止捕获"
      recorderingText=""
      stopRecorderText=""
      pausedRecorderText=""
      startRecorderText=""
      controls
      id=""
    />
  );

  fireEvent.click(screen.getByText('捕获屏幕'));

  await waitFor(() => screen.getByText('捕获屏幕'));
  expect(onStartCapture).toHaveBeenCalled();
});
