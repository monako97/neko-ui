import { createEffect, createUniqueId, For, Show } from 'solid-js';
import { render } from 'solid-js/web';
import { cx } from '@moneko/css';

import type { JSXElement } from '../basic-config';
import theme from '../theme';

import queque, { type NotificationType } from './queque';
import { styles } from './styles';

const mountId = 'n-notification-box';

const notification = (
  type: keyof typeof NotificationType,
  children: JSXElement,
  duration = 3000,
  close?: boolean,
  icon?: JSXElement,
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
          <style textContent={baseStyle()} />
          <style textContent={styles} />
          <For each={list()}>
            {(item) => {
              return (
                <div
                  class={cx('notification', item.type)}
                  classList={{
                    closeing: item.closeing,
                  }}
                >
                  <Show when={item.icon}>{item.icon}</Show>
                  <div class="content">{item.children}</div>
                  <Show when={item.close}>
                    <span
                      class="close"
                      on:click={() => {
                        remove(item.uniqueId);
                      }}
                    />
                  </Show>
                </div>
              );
            }}
          </For>
        </Show>
      );
    }, mount.shadowRoot!);

    document.body.appendChild(mount);
  }
  return uniqueId;
};

export default notification;
