self.Prism = {
  disableWorkerMessageHandler: true,
};
self.importScripts(new URL('../prism/prism.js', import.meta.url).toString());
self.addEventListener(
  'message',
  function (e) {
    let result;

    try {
      const { code, lang } = e.data;

      if (self.Prism.highlight && self.Prism.languages) {
        result = self.Prism.highlight(code, self.Prism.languages[lang], lang);
      } else {
        result = code;
      }
    } catch (error) {
      result = error;
    }
    self.postMessage(result); // 向主线程发送消息
  },
  false,
);
