import { fireEvent, render, waitFor } from '@solidjs/testing-library';

describe('ColorPicker', () => {
  it('normal', async () => {
    const { getByTestId } = render(() => (
      <n-color-picker
        data-testid="ColorPicker"
        popup-css=""
        popup-class="ColorPicker-overlay"
        default-value="red"
        size="small"
      />
    ));

    await waitFor(async () => {
      fireEvent.click(getByTestId('ColorPicker'));
    });
    await waitFor(async () => {
      fireEvent.click(document.body.firstChild!);
    });
  });
  it('size', () => {
    render(() => <n-color-picker value="red" data-testid="ColorPicker" size="small" />);
  });
});
