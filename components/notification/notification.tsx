import { For, Show, createEffect, createUniqueId } from 'solid-js';
import { cx } from '@moneko/css';
import { render } from 'solid-js/web';
import queque, { type NotificationType } from './queque';
import { styles } from './styles';
import theme from '../theme';

const mountId = 'n-notification-box';

const notification = (
  type: keyof typeof NotificationType,
  children: JSX.Element,
  duration = 3000,
  close?: boolean,
  icon?: JSX.Element,
) => {
  const uniqueId = createUniqueId();
  const { list, add, remove } = queque;
  const { baseStyle } = theme;
  let mount = document.getElementById(mountId);

  add({
    type,
    icon,
    children,
    close,
    uniqueId,
  });
  if (duration && duration > 0) {
    const timer = setTimeout(() => {
      remove(uniqueId);
      clearTimeout(timer);
    }, duration);
  }
  if (!mount) {
    mount = document.createElement('div');
    mount.id = mountId;
    mount.style.position = 'fixed';
    mount.style.insetBlockStart = '16px';
    mount.style.insetInlineStart = '50%';
    mount.style.transform = 'translateX(-50%)';
    mount.attachShadow({ mode: 'open' });

    const unmount = render(() => {
      createEffect(() => {
        if (list().length === 0) {
          unmount();
          mount?.remove();
        }
      });
      return (
        <Show when={list().length}>
          <style>
            {baseStyle()}
            {styles}
          </style>
          <For each={list()}>
            {(item) => {
              return (
                <div class={cx('notification', item.type, item.closeing && 'closeing')}>
                  <Show when={item.icon}>{item.icon}</Show>
                  <div class="content">{item.children}</div>
                  <Show when={item.close}>
                    <span class="close" onClick={() => remove(item.uniqueId)} />
                  </Show>
                </div>
              );
            }}
          </For>
        </Show>
      );
    }, mount!.shadowRoot!);

    document.body.appendChild(mount);
  }
  return uniqueId;
};

export default notification;
