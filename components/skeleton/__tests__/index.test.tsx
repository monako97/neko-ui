import { render } from '@solidjs/testing-library';

describe('Skeleton', () => {
  it('basic', () => {
    const { getByTestId } = render(() => <n-skeleton data-testid="basic" />);

    expect(getByTestId('basic')).toBeInTheDocument();
  });
  it('rows', () => {
    const { getByTestId } = render(() => <n-skeleton data-testid="rows" rows={6} />);

    expect(getByTestId('rows').shadowRoot!.querySelectorAll('.paragraph div').length).toBe(6);
  });
  it('avatar', () => {
    const { getByTestId } = render(() => <n-skeleton data-testid="avatar" avatar={true} />);

    expect(getByTestId('avatar').shadowRoot!.querySelector('.avatar')).toBeInTheDocument();
  });
  it('active', () => {
    const { getByTestId } = render(() => <n-skeleton data-testid="active" active={true} />);

    expect(getByTestId('active').shadowRoot!.querySelector('.active')).toBeInTheDocument();
  });
  it('title', () => {
    const { getByTestId } = render(() => <n-skeleton data-testid="title" title={true} />);

    expect(getByTestId('title').shadowRoot!.querySelector('.title')).toBeInTheDocument();
  });
});
