import React from 'react';
import Input from '../index';
import { render } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */
test('测试 Input', () => {
  const { container } = render(<Input />);

  expect(container).toBeInTheDocument();
});
