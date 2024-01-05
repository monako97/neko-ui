type NotificationType = 'info' | 'success' | 'danger' | 'error' | 'warning' | 'primary';

const notification = (
  type: NotificationType,
  content: string,
  duration: number,
  close: boolean,
): symbol => {
  // eslint-disable-next-line no-console
  console.log({
    type,
    content,
    duration,
    close,
  });
  return Symbol();
};

const destory = (id: number): void => {
  // eslint-disable-next-line no-console
  console.log(id);
};

export default {
  /**
   * 信息
   * @param {String} content               - 内容.
   * @param {Number} duration                 - 显示时间.
   * @param {Boolean} close                   - 显示关闭按钮.
   * @returns {Symbol} id
   */
  info: notification.bind(null, 'info'),
  /**
   * 成功
   * @param {String} content               - 内容.
   * @param {Number} duration                 - 显示时间.
   * @param {Boolean} close                   - 显示关闭按钮.
   * @returns {Symbol} id
   */
  success: notification.bind(null, 'success'),
  /**
   * 错误
   * @param {String} content               - 内容.
   * @param {Number} duration                 - 显示时间.
   * @param {Boolean} close                   - 显示关闭按钮.
   * @returns {Symbol} id
   */
  danger: notification.bind(null, 'danger'),
  /**
   * 警告
   * @param {String} content               - 内容.
   * @param {Number} duration                 - 显示时间.
   * @param {Boolean} close                   - 显示关闭按钮.
   * @returns {Symbol} id
   */
  warn: notification.bind(null, 'warning'),
  /**
   * 重要
   * @param {String} content               - 内容.
   * @param {Number} duration                 - 显示时间.
   * @param {Boolean} close                   - 显示关闭按钮.
   * @returns {Symbol} id
   */
  primary: notification.bind(null, 'primary'),
  /**
   * 销毁指定位置的消息
   * @param {Number} id               - 消息id.
   * @returns {void} void
   */
  destory: destory,
};
