import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { FC, MouseEvent, WheelEvent } from 'react';
import getPrefixCls from '../get-prefix-cls';
import { getScrollTop, setClipboard, classNames, isEqual, isSvgElement } from '@moneko/common';
import { getMarkedImgList, markdownUtil } from './markdown-util';
import { PhotoSlider } from 'react-photo-view';
import type { DataType as PhotoViewDataType } from 'react-photo-view/dist/types';
import 'react-photo-view/dist/react-photo-view.css';
import './index.global.less';

export type CodeBlockToolType = Array<'copy'>;

export interface MarkdownProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  /** md内容 */
  text?: string;
  /** 开启图片查看器 */
  pictureViewer?: boolean;
  /** 显示代码块行号 */
  langLineNumber?: boolean;
  /** 开启代码块工具条 */
  tools?: CodeBlockToolType;
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
};

const Markdown: FC<MarkdownProps> = ({
  className,
  style,
  text,
  pictureViewer = true,
  langLineNumber = true,
  tools = ['copy'],
  getAnchorContainer = () => window,
  tex,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
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

  const handleAnchor = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    toggleAnchor(e.target as HTMLAnchorElement);
    ref.current
      ?.querySelector(decodeURIComponent((e.target as HTMLAnchorElement)?.hash))
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
  };

  useEffect(() => {
    const _anchors: AnchorType[] = [];

    ref.current?.querySelectorAll('.markdown-toc li a')?.forEach((e) => {
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
  }, [htmlString]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;

      if (isSvgElement(target)) return;
      if (target.tagName === 'IMG' && pictureViewer) {
        const arr = ref.current?.getElementsByTagName('img') as unknown as HTMLImageElement[];

        for (let i = 0, len = arr.length; i < len; i++) {
          if (arr[i] === target) {
            setPhotoIndex(i);
            setVisible(true);
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
    getAnchorContainer()?.addEventListener('scroll', handleScroll);
    return () => {
      getAnchorContainer()?.removeEventListener('scroll', handleScroll);
    };
  }, [getAnchorContainer, handleScroll]);

  const cls = useMemo(() => classNames([getPrefixCls('markdown-box'), className]), [className]);

  useEffect(() => {
    if (tex) {
      require('katex/dist/katex.css');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const katex = require('katex');

      ref.current?.querySelectorAll('.m-katex-block').forEach(function (ele) {
        if (ele.textContent) {
          katex.render(ele.textContent, ele as HTMLElement, {
            throwOnError: false,
            displayMode: true,
            strict: false,
          });
        }
      });
      ref.current?.querySelectorAll('.m-katex-inline').forEach(function (ele) {
        if (ele.textContent) {
          katex.render(ele.textContent, ele as HTMLElement, {
            throwOnError: false,
            displayMode: false,
            strict: false,
          });
        }
      });
    }
  }, [tex, htmlString]);

  return (
    <Fragment>
      <div
        {...props}
        ref={ref}
        className={cls}
        style={style}
        dangerouslySetInnerHTML={{
          __html: htmlString,
        }}
        onClick={handleClick}
        onWheel={handleWheel}
      />
      {imgList.length ? (
        <PhotoSlider
          images={imgList}
          visible={visible}
          onClose={() => setVisible(false)}
          index={photoIndex}
          onIndexChange={setPhotoIndex}
        />
      ) : null}
    </Fragment>
  );
};

export default React.memo(Markdown, isEqual);
