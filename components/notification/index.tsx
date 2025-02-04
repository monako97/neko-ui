import type { JSXElement } from '../basic-config';

import notification from './notification';
import queque, { type NotificationProps } from './queque';

export type { NotificationProps, NotificationType } from './queque';

/** Api */
interface Notification {
  /**
   * 信息
   * @param {String} content               - 内容.
   * @param {Number} duration                 - 显示时间.
   * @param {Boolean} close                   - 显示关闭按钮.
   * @return {String} id
   */
  info(content: JSXElement, duration?: number, close?: boolean, icon?: JSXElement): string;
  /**
   * 成功
   * @param {String} content               - 内容.
   * @param {Number} duration                 - 显示时间.
   * @param {Boolean} close                   - 显示关闭按钮.
   * @return {String} id
   */
  success(content: JSXElement, duration?: number, close?: boolean, icon?: JSXElement): string;
  /**
   * 错误
   * @param {String} content               - 内容.
   * @param {Number} duration                 - 显示时间.
   * @param {Boolean} close                   - 显示关闭按钮.
   * @return {String} id
   */
  error(content: JSXElement, duration?: number, close?: boolean, icon?: JSXElement): string;
  /**
   * 警告
   * @param {String} content               - 内容.
   * @param {Number} duration                 - 显示时间.
   * @param {Boolean} close                   - 显示关闭按钮.
   * @return {String} id
   */
  warning(content: JSXElement, duration?: number, close?: boolean, icon?: JSXElement): string;
  /**
   * 主要
   * @param {String} content               - 内容.
   * @param {Number} duration                 - 显示时间.
   * @param {Boolean} close                   - 显示关闭按钮.
   * @return {String} id
   */
  primary(content: JSXElement, duration?: number, close?: boolean, icon?: JSXElement): string;
  /**
   * 更新通知内容
   * @param {String} id 通知id
   * @param {NotificationProps} item 更新内容
   * @constructor
   */
  update(uniqueId: string, item: NotificationProps): void;
  /**
   * 销毁全部通知
   * @constructor
   */
  destory: VoidFunction;
}

export default {
  info: notification.bind(null, 'info'),
  success: notification.bind(null, 'success'),
  error: notification.bind(null, 'error'),
  warning: notification.bind(null, 'warning'),
  primary: notification.bind(null, 'primary'),
  update: queque.update,
  destory: queque.clean,
} as Notification;
