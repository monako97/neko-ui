import marked from 'marked-completed';
import { entityToString } from '../utils/document';
import type { DataType as PhotoViewDataType } from 'react-photo-view/dist/types';
import * as Prism from './prism.js';

marked.setOptions({
  highlight: function (code: string, lang: string) {
    const LANGUAGE_REGEX = /^diff-([\w-]+)/i;

    if (Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    } else if (LANGUAGE_REGEX.test(lang)) {
      Prism.languages[lang] = Prism.languages.diff;
      return Prism.highlight(code, Prism.languages[lang], lang);
    }

    return Prism.highlight(code, Prism.languages.markup, 'markup');
  },
  headerPrefix: '# ',
  langLineNumber: true,
  langToolbar: ['copy'],
  breaks: true,
  pedantic: false,
  smartLists: true,
  smartypants: true,
  xhtml: true,
});

/**
 * Markdown to Html
 * @param {string} text Markdown文本
 * @param {MarkedOptions} option MarkedOptions
 * @returns {string} Html文本
 */
export const markdownUtil = (text: string, option: marked.MarkedOptions = {}): string => {
  return marked(text, option);
};

/**
 * 提取md图片src
 * @param {string} text HTML string
 * @returns {PhotoViewDataType[]} PhotoViewDataType
 */
export const getMarkedImgList = (text: string): PhotoViewDataType[] => {
  if (!text) return [];
  const imageList = text.match(/role=('|")dialog('|") src=('|")(.*?) alt=('|")(.*?)('|")/g);
  const imageArr = [];

  if (imageList) {
    for (let i = 0, len = imageList.length; i < len; i++) {
      const params: URLSearchParams = new URLSearchParams(
        entityToString(
          imageList[i].replace(/('|")/g, '').replace(/ src=/, '&src=').replace(/ alt=/, '&alt=')
        )
      );

      imageArr.push({
        intro: params.get('alt') || '' + i,
        src: params.get('src') || '',
        key: i,
      });
    }
  }
  return imageArr;
};
