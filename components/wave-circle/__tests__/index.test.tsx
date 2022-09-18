import React from 'react';
import WaveCircle from '../index';
import { render, screen } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */
test('测试 WaveCircle', () => {
  const testMessage = '这是传入的文字';

  render(
    <WaveCircle
      bgColor="#000"
      className="test-wave-circle"
      timingFunction="cubic-bezier(0.645, 0.045, 0.355, 1)"
    >
      {testMessage}
    </WaveCircle>
  );
  // 页面存在传入的文字
  expect(screen.getByText(testMessage)).toBeInTheDocument();
  // 页面存在传入的文字并且存在传入的className
  expect(
    screen.getByText((content, element) => {
      return !!(
        element?.classList.contains('wave-circles') &&
        element?.classList.contains('test-wave-circle') &&
        content === testMessage
      );
    })
  ).toBeInTheDocument();
});
