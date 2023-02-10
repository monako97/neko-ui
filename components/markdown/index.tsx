import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FC,
  type MouseEvent,
  type WheelEvent,
} from 'react';
import {
  classNames,
  entityToString,
  getScrollTop,
  setClipboard,
  isEqual,
  isSvgElement,
} from '@moneko/common';
import { PhotoSlider } from 'react-photo-view';
import { throttle } from 'lodash';
import marked from 'marked-completed';
import { highlight } from '../utils/highlight';
import './index.css';
import '../utils/prism.css';

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

export type CodeToolType = Array<'copy'>;
export interface MarkdownProps {
  className?: string;
  style?: CSSProperties;
  /** md内容 */
  text?: string;
  /** 开启图片查看器 */
  pictureViewer?: boolean;
  /** 显示代码块行号 */
  langLineNumber?: boolean;
  /** 开启代码块工具条 */
  tools?: CodeToolType;
  /** 指定滚动的容器 */
  getAnchorContainer?: () => HTMLElement;
  /** 渲染KateX数学公式 */
  tex?: boolean;
}

export type AnchorType = {
  anchor: HTMLAnchorElement;
  top: number;
};

const toggleAnchor = (anchor: HTMLAnchorElement) => {
  anchor.offsetParent?.querySelectorAll('li')?.forEach((a) => {
    a.classList.remove('active');
  });
  anchor.parentElement?.classList.add('active');
  const box = anchor.offsetParent?.getBoundingClientRect();
  const anchorRect = anchor.getBoundingClientRect();

  if (box) {
    let scrollLogicalPosition: ScrollLogicalPosition | null = null;

    if (box.top > anchorRect.top) {
      scrollLogicalPosition = 'nearest';
    } else if (box.height + box.top < anchorRect.top + anchorRect.height) {
      scrollLogicalPosition = 'nearest';
    }
    if (scrollLogicalPosition !== null) {
      anchor.parentElement?.scrollIntoView({
        behavior: 'smooth',
        block: scrollLogicalPosition,
      });
    }
  }
};
const tocWheel = (e: Event) => {
  e.preventDefault();
  const { currentTarget, deltaY } = e as unknown as WheelEvent<HTMLElement>;
  const targetDom = currentTarget as HTMLElement;

  if (targetDom.classList.contains('n-md-toc')) {
    targetDom.scrollTop = targetDom.scrollTop + deltaY;
  }
};

const Markdown: FC<MarkdownProps> = ({
  className,
  text,
  pictureViewer = true,
  langLineNumber = true,
  tools = ['copy'],
  getAnchorContainer = () => window,
  tex,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [htmlString, setHtmlString] = useState<string>('');
  const [imgList, setImgList] = useState<PhotoViewDataType[]>([]);
  const htmlStrRef = useRef<string>(htmlString);
  const anchors = useRef<AnchorType[]>([]);

  useMemo(() => {
    let str = htmlStrRef.current;

    if (text) {
      str = markdownUtil(text, {
        langLineNumber,
        langToolbar: tools,
      });
    } else {
      str = '';
    }
    if (str !== htmlStrRef.current) {
      Object.assign(htmlStrRef, {
        current: str,
      });
      setHtmlString(str);
    }
  }, [text, langLineNumber, tools]);

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      window.Prism.highlightAll();
      if (typeof timer === 'number') clearTimeout(timer);
    }, 0);

    if (pictureViewer) {
      setImgList(getMarkedImgList(htmlString));
    }
    return () => {
      if (typeof timer === 'number') {
        clearTimeout(timer);
      }
    };
  }, [htmlString, pictureViewer]);

  const handleAnchor = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    toggleAnchor(e.target as HTMLAnchorElement);
    ref.current
      ?.querySelector(decodeURIComponent((e.target as HTMLAnchorElement)?.hash))
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
  }, []);

  useEffect(() => {
    const _anchors: AnchorType[] = [];

    ref.current?.querySelectorAll('.n-md-toc li a')?.forEach((e) => {
      const a = e as HTMLAnchorElement;
      const _el = ref.current?.querySelector(
        decodeURIComponent((a as HTMLAnchorElement)?.hash)
      ) as HTMLElement;

      _anchors.push({
        anchor: a,
        top: _el.offsetTop,
      });
      (e as HTMLAnchorElement).onclick = handleAnchor;
    });

    Object.assign(anchors, {
      current: _anchors,
    });
  }, [handleAnchor, htmlString]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;

      if (isSvgElement(target)) return;
      if (target.tagName === 'IMG' && pictureViewer) {
        const arr = ref.current?.getElementsByTagName('img') as unknown as HTMLImageElement[];

        for (let i = 0, len = arr.length; i < len; i++) {
          if (arr[i] === target) {
            setPhotoIndex(i);
            setOpen(true);
          }
        }
      } else if (target.className.includes('toolbar-copy')) {
        const offsetParent = target.offsetParent as HTMLElement;

        if (!offsetParent?.hasAttribute('data-copy')) {
          setClipboard(offsetParent?.innerText, offsetParent);
        }
      }
    },
    [pictureViewer]
  );

  const handleWheel = useCallback((event: WheelEvent<HTMLDivElement>) => {
    const offsetParent = (event.target as HTMLElement).offsetParent;

    if (!offsetParent || offsetParent.tagName !== 'PRE') {
      return;
    }
    const rows = offsetParent?.getElementsByClassName('line-numbers-rows');

    if (rows?.length) {
      const codeTag: HTMLElement = offsetParent.getElementsByTagName('code')[0];

      if (codeTag.scrollHeight - codeTag.offsetHeight && rows[0].scrollTop !== codeTag.scrollTop) {
        // 可滚动高度大于0
        rows[0].scrollTop = codeTag.scrollTop;
      }
    }
  }, []);
  const handleScroll = useCallback((e: Event) => {
    if (!anchors.current.length) return;
    const el = e.target as HTMLElement;
    const top = getScrollTop(el);
    let anchor: HTMLAnchorElement | null = null;

    anchors.current.forEach((a) => {
      if (top - a.top > -el.offsetHeight / 2) anchor = a.anchor;
    });

    if (anchor) {
      toggleAnchor(anchor);
    }
  }, []);

  useEffect(() => {
    ref.current
      ?.querySelector('ol.n-md-toc')
      ?.addEventListener('wheel', throttle(tocWheel, 8, { trailing: true }), false);
    getAnchorContainer()?.addEventListener(
      'scroll',
      throttle(handleScroll, 200, { trailing: true })
    );
    return () => {
      document
        .querySelector('ol.n-md-toc')
        ?.removeEventListener('wheel', throttle(tocWheel, 8, { trailing: true }), false);
      getAnchorContainer()?.removeEventListener(
        'scroll',
        throttle(handleScroll, 200, { trailing: true })
      );
    };
  }, [getAnchorContainer, handleScroll]);

  useEffect(() => {
    if (tex) {
      require('katex/dist/katex.css');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const katex = require('katex');

      ref.current?.querySelectorAll('.n-katex-block').forEach(function (ele) {
        if (ele.textContent) {
          katex.render(ele.textContent, ele as HTMLElement, {
            throwOnError: false,
            displayMode: true,
            strict: false,
            output: 'html',
          });
        }
      });
      ref.current?.querySelectorAll('.n-katex-inline').forEach(function (ele) {
        if (ele.textContent) {
          katex.render(ele.textContent, ele as HTMLElement, {
            throwOnError: false,
            displayMode: false,
            strict: false,
            output: 'html',
          });
        }
      });
    }
  }, [tex, htmlString]);
  useEffect(() => {
    if (imgList.length) {
      require('react-photo-view/dist/react-photo-view.css');
    }
  }, [imgList]);

  return (
    <>
      <div
        ref={ref}
        className={classNames('n-md-box', className)}
        dangerouslySetInnerHTML={{
          __html: htmlString,
        }}
        onClick={handleClick}
        onWheel={handleWheel}
        {...props}
      />
      {imgList.length ? (
        <PhotoSlider
          images={imgList}
          visible={open}
          onClose={() => setOpen(false)}
          index={photoIndex}
          onIndexChange={setPhotoIndex}
        />
      ) : null}
    </>
  );
};

export default memo(Markdown, isEqual);
