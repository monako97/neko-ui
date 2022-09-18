import React from 'react';
import Tag from '../index';
import { render } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */
test('测试 Tag', () => {
  const { container } = render(<Tag className="tags-cls" />);

  expect(container.querySelector('.tags-cls')).toBeInTheDocument();
});
