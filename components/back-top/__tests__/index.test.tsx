import React from 'react';
import BackTop from '../index';
import { render } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */
test('测试 BackTop 默认', () => {
  const { container } = render(<BackTop />);

  expect(container).toBeInTheDocument();
});

/**
 * @jest-environment jsdom
 */
test('测试 BackTop', () => {
  const { container } = render(<BackTop visibilityHeight={200} target={() => document.body} />);

  expect(container).toBeInTheDocument();
});
