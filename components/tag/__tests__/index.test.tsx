import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Tag', () => {
  it('basic', async () => {
    const { container } = render(() => (
      <n-tag data-testid="tag" disabled={true}>
        Tag 1
      </n-tag>
    ));

    expect(container).toBeInTheDocument();
  });
  it('color', async () => {
    const { container } = render(() => (
      <n-tag data-testid="tag" color="#f50">
        Tag 1
      </n-tag>
    ));

    expect(container).toBeInTheDocument();
    expect(screen.getByTestId('tag').shadowRoot?.innerHTML.includes('.tag-custom')).toBe(true);
  });
  it('bordered', async () => {
    const { container } = render(() => (
      <n-tag data-testid="tag" bordered={false}>
        Tag 1
      </n-tag>
    ));

    expect(container).toBeInTheDocument();
    expect(
      screen.getByTestId('tag').shadowRoot?.lastElementChild!.classList.contains('.bordered'),
    ).toBe(false);
  });
  it('icon', async () => {
    const { container } = render(() => (
      <n-tag data-testid="tag" icon="⚾">
        Tag 1
      </n-tag>
    ));

    expect(container).toBeInTheDocument();
    expect(screen.getByTestId('tag').shadowRoot?.querySelector('.icon')!.innerHTML).toBe('⚾');
  });
  it('type', async () => {
    const { container } = render(() => (
      <n-tag data-testid="tag" type="primary">
        Tag 1
      </n-tag>
    ));

    expect(container).toBeInTheDocument();
    expect(screen.getByTestId('tag').shadowRoot?.querySelector('.primary')).toBeInTheDocument();
  });
  it('close-icon', async () => {
    render(() => (
      <n-tag data-testid="tag" close-icon={true}>
        Tag 1
      </n-tag>
    ));

    fireEvent.click(screen.getByTestId('tag').shadowRoot!.querySelector('.close')!);
    render(() => (
      <n-tag data-testid="tag2" close-icon={<span>x</span>}>
        Tag 1
      </n-tag>
    ));

    fireEvent.click(screen.getByTestId('tag2').shadowRoot!.querySelector('.close')!);
  });
});
