import { render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('test Input', () => {
  it('normal', () => {
    render(() => (
      <n-typography data-testid="normal" type="primary">
        primary text
      </n-typography>
    ));

    expect(screen.getByShadowText('primary text')).toBeInTheDocument();
  });
  it('truncated', () => {
    render(() => (
      <n-typography data-testid="truncated" truncated={2}>
        truncated
      </n-typography>
    ));

    expect(screen.getByShadowText('truncated')).toBeInTheDocument();
  });
});
