Object.defineProperty(window.HTMLCanvasElement.prototype, 'getContext', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    ...window.HTMLCanvasElement.prototype.getContext,
    rect: jest.fn(),
    fillRect: jest.fn(),
    fill: jest.fn(),
    createLinearGradient: () => {
      return {
        addColorStop: jest.fn(),
      };
    },
    getImageData: function (x: number, y: number, w: number, h: number) {
      return {
        data: [x, y, w, h],
      };
    },
  })),
});
