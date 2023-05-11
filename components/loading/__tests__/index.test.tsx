import React from 'react';
import { render } from '@testing-library/react';
import { Loading } from 'neko-ui';

/**
 * @jest-environment jsdom
 */
test('测试 Loading', () => {
  const { container } = render(
    <Loading loading>
      <span>aaaa</span>
      <span>ss</span>
    </Loading>
  );

  expect(container).toBeInTheDocument();
});
