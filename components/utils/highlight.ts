import * as Prism from '../utils/prism.js';

const LANGUAGE_REGEX = /^diff-([\w-]+)/i;

export const highlight = (code: string, lang: string) => {
  if (Prism.languages[lang]) {
    return Prism.highlight(code, Prism.languages[lang], lang);
  } else if (LANGUAGE_REGEX.test(lang)) {
    Prism.languages[lang] = Prism.languages.diff;
    return Prism.highlight(code, Prism.languages[lang], lang);
  }
  return Prism.highlight(code, Prism.languages.markup, 'markup');
};
