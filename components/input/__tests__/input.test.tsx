import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from 'neko-ui';

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
  });
  it('prefix', () => {
    const { container } = render(
      <Input prefix={<span data-testid="prefix-tag">prefix</span>} disabled />
    );

    expect(container.textContent).toEqual('prefix');
    expect(screen.getAllByTestId('prefix-tag')[0]).toBeInTheDocument();
  });
  it('suffix', async () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Input
        data-testid="input-suffix"
        type="number"
        onChange={handleChange}
        suffix={<span data-testid="suffix-tag">suffix</span>}
      />
    );

    fireEvent.input(screen.getByTestId('input-suffix'), {
      target: {
        value: '1-',
      },
    });
    fireEvent.input(screen.getByTestId('input-suffix'), {
      target: {
        value: 'a-',
      },
    });
    expect(container.textContent).toEqual('suffix');
    expect(screen.getAllByTestId('suffix-tag')[0]).toBeInTheDocument();
  });
  it('formatter & parser', () => {
    const handleChange = jest.fn();

    render(
      <Input
        data-testid="input-formatter"
        formatter={(v) => `${((v as number) || 0) * 100}%`}
        parser={(v) => parseFloat(v?.toString().replace(/%$/, '') || '0') / 100}
        onChange={handleChange}
      />
    );

    fireEvent.input(screen.getByTestId('input-formatter'), {
      target: {
        value: 1,
      },
    });
    expect(screen.getByTestId('input-formatter')).toBeInTheDocument();
  });
});
