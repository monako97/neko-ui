import React from 'react';
import { render, screen } from '@testing-library/react';
import { prefixCls, Skeleton } from 'neko-ui';

/*
 * @jest-environment jsdom
 */

describe('Skeleton', () => {
  it('basic', () => {
    const testid = 'skeleton-basic-test-id';

    render(<Skeleton data-testid={testid} />);
    expect(screen.getByTestId(testid)).toBeInTheDocument();
  });
  it('rows', () => {
    const testid = 'skeleton-rows-test-id',
      rows = 6;

    render(<Skeleton data-testid={testid} rows={6} />);

    expect(
      screen.getByTestId(testid).querySelectorAll(`.${prefixCls('skeleton-paragraph')} div`).length
    ).toBe(rows);
  });
  it('avatar', () => {
    const testid = 'skeleton-avatar-test-id';

    render(<Skeleton data-testid={testid} avatar />);

    expect(
      screen.getByTestId(testid).querySelector(`.${prefixCls('skeleton-avatar')}`)
    ).toBeInTheDocument();
  });
  it('active', () => {
    const testid = 'skeleton-active-test-id';

    render(<Skeleton data-testid={testid} active />);

    expect(
      screen.getByTestId(testid).querySelector(`.${prefixCls('skeleton-active')}`)
    ).toBeInTheDocument();
  });
  it('title', () => {
    const testid = 'skeleton-title-test-id';

    render(<Skeleton data-testid={testid} title />);

    expect(
      screen.getByTestId(testid).querySelector(`.${prefixCls('skeleton-title')}`)
    ).toBeInTheDocument();
  });
});
