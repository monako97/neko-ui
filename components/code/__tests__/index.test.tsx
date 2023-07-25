import { fireEvent, render } from '@solidjs/testing-library';
import { CodeElement } from 'neko-ui';

describe('Code', () => {
  it('basic', () => {
    const { container } = render(() => (
      <>
        <n-code line-number={true} lang="javascript">
          {`const foo = bar.baz([1, 2, 3]) + 1;
console.log(\`foo: $\{foo}\`);`}
        </n-code>
        <n-code
          code={`let foo = bar.baz([1, 2, 3]);
          foo = foo + 1;`}
          lang="javascript"
        />
      </>
    ));

    expect(container).toBeInTheDocument();
  });
  it('toolbar', () => {
    const { getByTestId } = render(() => (
      <n-code data-testid="code" toolbar={true} lang="javascript">
        {`const foo = bar.baz([1, 2, 3]) + 1;
console.log(\`foo: $\{foo}\`);`}
      </n-code>
    ));

    expect(getByTestId('code')).toBeInTheDocument();
    fireEvent.click(getByTestId('code').shadowRoot!.querySelector('.toolbar-copy')!);
  });
  it('edit', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-code data-testid="code" line-number={true} edit={true} onChange={change} lang="javascript">
        {`const foo = bar.baz([1, 2, 3]) + 1;
console.log(\`foo: $\{foo}\`);`}
      </n-code>
    ));

    fireEvent.input(getByTestId('code').shadowRoot!.querySelector('textarea')!, {
      target: {
        value: 'sacsa',
      },
    });
    (getByTestId('code') as unknown as CodeElement).code = '';
  });
});
