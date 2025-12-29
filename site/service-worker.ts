import { notification } from 'neko-ui';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(new URL('./precaching.ts', import.meta.url));
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data?.type === 'SW_UPDATED') {
      notification.warning(`New version available: ${event.data.version}`);
      // 可弹窗提示用户刷新
      // location.reload();
    }
  });
}
