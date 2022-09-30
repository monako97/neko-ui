import { isNull, isUndefined, isFunction } from '../utils/type';

interface ClientSizeTypes {
  width: number;
  height: number;
}
/**
 * 获取可视区域大小
 * @return {ClientSizeTypes} clientWidth and clientHeight
 */
export const getClientSize = (): ClientSizeTypes => {
  if (!isNull(window.innerWidth)) {
    // ie9 +  最新浏览器
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  } else if (document.compatMode === 'CSS1Compat') {
    // 标准浏览器
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  }
  return {
    // 怪异浏览器
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  };
};

/**
 * 获取最大 z-index
 * @returns {number} z-index
 */
export const getMaxZindex = (): number => {
  return (Array.prototype.slice.call(document.body.querySelectorAll('*')) || []).reduce(
    (r, e) => Math.max(r, +window.getComputedStyle(e).zIndex || 0),
    0
  );
};

/**
 * 获取滚动条距离顶端的距离
 * @param {HTMLElement} ele HTMLElement
 * @return {Number} scrollTop
 */
export const getScrollTop = (ele?: HTMLElement): number => {
  if (ele) {
    return ele.scrollTop;
  } else if (!isUndefined(window.pageXOffset)) {
    return window.pageYOffset;
  } else if ((document.compatMode || '') === 'CSS1Compat') {
    return document.documentElement.scrollTop;
  }
  return document.body.scrollTop;
};

/**
 * HTML实体字符转string
 * @param {string} entity HTML实体字符
 * @returns {string} string
 */
export const entityToString = (entity: string): string => {
  let div: HTMLDivElement | null = document.createElement('div');

  div.innerHTML = entity;
  const res = div.innerText || div.textContent;

  div = null;
  return res || '';
};

/**
 * 复制文本到剪切板
 * @param {string} text 内容
 * @param {Element} target 提示的节点
 * @param {Function} onError 失败的回调
 * @returns {Promise<void>} Promise<void>
 */
export const setClipboard = (text: string, target?: Element, onError?: () => void): void => {
  const clipboardTimer = (_target: HTMLElement | Element) => {
    let _clipboardTimer: number | null = window.setTimeout(() => {
      _target.setAttribute('data-copy-exit', '');
      if (_clipboardTimer !== null) {
        window.clearTimeout(_clipboardTimer);
        _clipboardTimer = null;
      }
      let _clipboardTimerExit: number | null = window.setTimeout(() => {
        _target.removeAttribute('data-copy-exit');
        _target.removeAttribute('data-copy');
        if (_clipboardTimerExit !== null) {
          window.clearTimeout(_clipboardTimerExit);
          _clipboardTimerExit = null;
        }
      }, 300);
    }, 4000);
  };

  if (typeof navigator.clipboard === 'undefined') {
    if (target) {
      target.setAttribute('data-copy', 'failure');
      clipboardTimer(target);
    }
    if (isFunction(onError)) {
      onError();
    }
    return;
  }

  if (target) {
    navigator.clipboard
      .writeText(text)
      .then(
        () => {
          target.setAttribute('data-copy', 'success');
        },
        () => {
          target.setAttribute('data-copy', 'failure');
        }
      )
      .finally(() => clipboardTimer(target));
  } else {
    navigator.clipboard.writeText(text);
  }
};
