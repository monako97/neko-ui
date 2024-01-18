import { createRoot, createSignal } from 'solid-js';

/** Api
 * @since 2.7.0
 */
export interface NotificationProps {
  /** 通知类型 */
  type: keyof typeof NotificationType;
  /** 通知内容 */
  children: JSX.Element;
  /** 图标 */
  icon?: JSX.Element;
  /**
   * 是否显示关闭按钮
   * @default false
   */
  close?: boolean;
  /**
   * 显示通知时间, 到时自动关闭; 当 duration < 1 时不自动关闭
   * @default 3000
   */
  duration?: boolean;
}

/** 通知类型 */
export enum NotificationType {
  /** 详细 */
  info = 'info',
  /** 成功 */
  success = 'success',
  /** 错误 */
  error = 'error',
  /** 警告 */
  warning = 'warning',
  /** 主要 */
  primary = 'primary',
}

interface NotificationQueQue extends NotificationProps {
  uniqueId: string;
  closeing?: boolean;
}
const queque = createRoot(() => {
  const [list, setList] = createSignal<NotificationQueQue[]>([]);

  function add(item: NotificationQueQue) {
    setList((prev) => [...prev, item]);
  }
  function remove(uniqueId: string) {
    setList((prev) =>
      prev.map((q) => {
        if (q.uniqueId === uniqueId) {
          return { ...q, closeing: true };
        }
        return q;
      }),
    );
    const timer = setTimeout(() => {
      setList((prev) => prev.filter((q) => q.uniqueId !== uniqueId));
      clearTimeout(timer);
    }, 200);
  }
  function update(uniqueId: string, item: NotificationProps) {
    setList((prev) =>
      prev.map((q) => {
        if (q.uniqueId === uniqueId) {
          return { ...q, ...item };
        }
        return q;
      }),
    );
  }
  function clean() {
    setList([]);
  }
  return { list, add, remove, clean, update };
});

export default queque;
