import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Switch } from 'neko-ui';

/**
 * @jest-environment jsdom
 */
describe('test Input', () => {
  it('normal', () => {
    const { getByTestId } = render(<Switch data-testid="normal" />);

    expect(getByTestId('normal')).toBeInTheDocument();
    fireEvent.focus(getByTestId('normal'));
    fireEvent.click(getByTestId('normal'));
    fireEvent.click(getByTestId('normal'));
  });
  it('onChange', () => {
    const change = jest.fn();

    const { getByTestId } = render(<Switch data-testid="onChange" onChange={change} />);

    expect(getByTestId('onChange')).toBeInTheDocument();
    fireEvent.focus(getByTestId('onChange'));
    fireEvent.keyUp(getByTestId('onChange'), { key: 'Enter' });
    expect(change).toBeCalled();
  });
  it('disabled', () => {
    const change = jest.fn();
    const { getByTestId } = render(
      <Switch data-testid="disabled" onLabel="开" offLabel="关" disabled onChange={change} />
    );

    expect(getByTestId('disabled')).toBeInTheDocument();
    expect(change).not.toBeCalled();
  });
  it('loading', () => {
    const change = jest.fn();
    const { getByTestId } = render(<Switch data-testid="loading" loading onChange={change} />);

    expect(getByTestId('loading')).toBeInTheDocument();
    expect(change).not.toBeCalled();
  });
});
