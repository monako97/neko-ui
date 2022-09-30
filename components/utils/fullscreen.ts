/**
 * 进入全屏
 * @constructor
 * @param {Element} element Element
 */
export function requestFullscreen(element: Element): void {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}
/**
 * 退出全屏
 * @constructor
 */
export function exitFullscreen(): void {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExiFullscreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
}
/**
 * 是否全屏
 * @returns {boolean} boolean
 */
export function isFullscreen(): boolean {
  return (
    document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement
  );
}
/**
 * 切换全屏
 * @constructor
 * @param {Element} element Element
 */
export function toggleFullscreen(element: Element): void {
  if (isFullscreen()) {
    exitFullscreen();
  } else {
    requestFullscreen(element);
  }
}
