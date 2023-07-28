import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Cron', () => {
  it('basic', () => {
    const change = jest.fn();
    const defaultValue = '0,1 * 0#1 * * ? 2023/1';
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value={defaultValue} onChange={change} />
    ));

    expect(screen.getByShadowText(defaultValue)).toBeInTheDocument();
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    expect(tabs?.querySelector('.tabs.line')).toBeInTheDocument();

    tabs!.querySelectorAll('.tab').forEach((e) => {
      fireEvent.click(e as unknown as HTMLElement);
      tabs!
        .querySelector('n-radio')!
        .shadowRoot!.querySelectorAll('.item')
        .forEach((r) => {
          fireEvent.click(r as unknown as HTMLElement);
        });
    });

    expect(change).toHaveBeenCalled();
  });
  it('card', () => {
    const { getByTestId } = render(() => <n-cron data-testid="tabs" type="card" />);
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs') as unknown as HTMLElement;

    expect(tabs.shadowRoot?.querySelector('.tabs.card')).toBeInTheDocument();
  });
  it('show cron', () => {
    render(() => <n-cron data-testid="tabs" value="0-1 * 0-1 * * ? 2023/1" show-cron={false} />);

    expect(() => {
      screen.getByShadowText('0-1 * 0-1 * * ? 2023/1');
    }).toThrow('');
  });
  it('value', () => {
    render(() => <n-cron value=" " show-cron={false} />);
  });
});
