import React from 'react';
import Input from '../index';
import { fireEvent, render, screen } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */
describe('test Input', () => {
  it('normal', () => {
    render(<Input data-testid="btn" />);

    expect(screen.getByTestId('btn')).toBeInTheDocument();
    fireEvent.focus(screen.getByTestId('btn'));
    fireEvent.blur(screen.getByTestId('btn'));
  });
  it('size', () => {
    render(<Input data-testid="size" size="small" />);

    expect(screen.getByTestId('size').parentElement?.className.includes('-input-small')).toBe(true);
  });
  it('prefix', () => {
    const { container } = render(
      <Input prefix={<span data-testid="prefix-tag">prefix</span>} className="btn" disabled />
    );

    expect(container.textContent).toEqual('prefix');
    expect(screen.getAllByTestId('prefix-tag')[0]).toBeInTheDocument();
  });
  it('suffix', () => {
    const { container } = render(
      <Input suffix={<span data-testid="suffix-tag">suffix</span>} className="btn" />
    );

    expect(container.textContent).toEqual('suffix');
    expect(screen.getAllByTestId('suffix-tag')[0]).toBeInTheDocument();
  });
});
