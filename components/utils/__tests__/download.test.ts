import { downloadBlob, Navigator } from '../download';

/**
 * @jest-environment jsdom
 */
describe('test downloadBlob', () => {
  it('URL', () => {
    global.URL.revokeObjectURL = jest.fn(() => 'details');
    global.URL.createObjectURL = jest.fn(() => 'details');

    downloadBlob(new Blob([]), 'as');

    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(global.URL.revokeObjectURL).toHaveBeenCalledTimes(1);
  });

  it('webkitURL', () => {
    global.URL = null as unknown as typeof URL;
    global.webkitURL.revokeObjectURL = jest.fn(() => 'details');
    global.webkitURL.createObjectURL = jest.fn(() => 'details');

    downloadBlob(new Blob([]), 'as');

    expect(global.webkitURL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(global.webkitURL.revokeObjectURL).toHaveBeenCalledTimes(1);
  });

  it('IE msSaveBlob', () => {
    (window.navigator as Navigator).msSaveBlob = jest.fn(() => 'details');

    downloadBlob(new Blob([]), 'as');

    expect((window.navigator as Navigator).msSaveBlob).toHaveBeenCalledTimes(1);
  });
});
