import marked from 'marked-completed';
import { entityToString } from '@moneko/common';
import { highlight } from '../utils/highlight';

marked.setOptions({
  highlight: highlight,
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
export const markdownUtil = (text: string, option: marked.MarkedOptions): string => {
  return marked(text, option);
};

export type PhotoViewDataType = {
  src?: string;
  intro?: string;
  key: string | number;
};
/**
 * 提取md图片src
 * @param {string} text HTML string
 * @returns {PhotoViewDataType[]} PhotoViewDataType
 */
export const getMarkedImgList = (text: string): PhotoViewDataType[] => {
  if (!text) return [];
  const imageList = text.match(/role=('|")dialog('|") src=('|")(.*?) alt=('|")(.*?)('|")/g);
  const imageArr: PhotoViewDataType[] = [];

  if (imageList) {
    for (let i = 0, len = imageList.length; i < len; i++) {
      const params: URLSearchParams = new URLSearchParams(
        entityToString(
          imageList[i].replace(/('|")/g, '').replace(/ src=/, '&src=').replace(/ alt=/, '&alt=')
        )
      );

      imageArr.push({
        intro: params.get('alt') as string,
        src: params.get('src') as string,
        key: i,
      });
    }
  }
  return imageArr;
};
