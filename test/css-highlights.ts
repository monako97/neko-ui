if (!CSS.highlights) {
  CSS.highlights = {
    get: () => {
      return {
        add: () => {},
      } as unknown as Highlight;
    },
    set: () => CSS.highlights as unknown as HighlightRegistry,
  } as unknown as HighlightRegistry;
}
