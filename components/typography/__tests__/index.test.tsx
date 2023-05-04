import React from 'react';
import { render } from '@testing-library/react';
import { Typography } from 'neko-ui';

/**
 * @jest-environment jsdom
 */
describe('test Input', () => {
  it('normal', () => {
    const { getByTestId } = render(
      <Typography data-testid="normal" type="primary">
        primary text
      </Typography>
    );

    expect(getByTestId('normal')).toBeInTheDocument();
  });
  it('truncated', () => {
    const { getByTestId } = render(
      <Typography data-testid="truncated" truncated={{ rows: 2 }}>
        truncated
      </Typography>
    );

    expect(getByTestId('truncated')).toBeInTheDocument();
  });
});
