export interface Navigator {
  // eslint-disable-next-line no-unused-vars
  msSaveBlob?: (blob: Blob, defaultName?: string) => string;
}

/**
 * 保存Blob对象到本地
 * @constructor
 * @param {Blob} blob Blob
 * @param {string} fileName 文件名
 */
export const downloadBlob = (blob: Blob, fileName: string): void => {
  const navigator = window.navigator as Navigator;

  // window.navigator.msSaveBlob：以本地方式保存文件
  if (typeof navigator.msSaveBlob !== 'undefined') {
    navigator.msSaveBlob(blob, fileName);
  } else {
    // 创建新的URL表示指定的File对象或者Blob对象
    const URL = window.URL || window.webkitURL;
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // 清除对象
    URL.revokeObjectURL(objectUrl);
  }
};

export default downloadBlob;
