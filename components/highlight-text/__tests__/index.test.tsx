import { render } from '@solidjs/testing-library';

describe('HighlightText', () => {
  it('basic', () => {
    const { container } = render(() => (
      <n-highlight-text
        text="s"
        highlight="s"
        class="csca"
        style={{
          color: 'red',
        }}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('未匹配', () => {
    const { container } = render(() => <n-highlight-text text="sasc" highlight={'d'} />);

    expect(container).toBeInTheDocument();
  });

  it('无匹配内容', () => {
    const { container } = render(() => <n-highlight-text text="sasc" />);

    expect(container).toBeInTheDocument();
  });

  it('多条件', () => {
    const { container } = render(() => (
      <n-highlight-text text="sasc" highlight={['a', 'c']} extra="csa" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('多条件', () => {
    const { container } = render(() => (
      <n-highlight-text
        text="sasc"
        highlight={[
          'a',
          {
            highlight: 'c',
            flag: 'i',
          },
        ]}
      />
    ));

    expect(container).toBeInTheDocument();
  });
});
