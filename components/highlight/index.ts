import '../prism';
import '../prism/prism.css';

const LANGUAGE_REGEX = /^diff-([\w-]+)/i;

const highlight = (code: string, lang: string) => {
  if (window.Prism.languages[lang]) {
    return window.Prism.highlight(code, window.Prism.languages[lang], lang);
  } else if (LANGUAGE_REGEX.test(lang)) {
    window.Prism.languages[lang] = window.Prism.languages.diff;
    return window.Prism.highlight(code, window.Prism.languages[lang], lang);
  }
  return window.Prism.highlight(code, window.Prism.languages.markup, 'markup');
};

export default highlight;
