import type { ConfigType } from '@moneko/core';

const CDNHOST = 'https://cdn.statically.io https://img.picui.cn';
const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    meta: {
      CSP: {
        'http-equiv': 'Content-Security-Policy',
        content: `script-src 'self' ${CDNHOST} 'unsafe-eval' 'unsafe-inline' blob:;`,
      },
      'X-Content-Type-Options': 'nosniff',
      'google-site-verification': 'gmDerloN7NoGvGSeX5M-tWX4SHXJ5XdXvA5bO2oZL5Y',
    },
  },
  fallbackCompPath: '@/components/fallback',
  devServer: {
    https: true,
  },
  manifest: {
    screenshots: [
      {
        src: 'https://h5static.dewucdn.com/node-common/672cb705-6a2b-7cde-2764-91e7af356478.webp',
        sizes: '390x844',
        type: 'image/webp',
        form_factor: 'narrow',
        label: 'Home',
      },
      {
        src: 'https://h5static.dewucdn.com/node-common/f1cd0113-adb7-de1a-ff81-2e386b3a291c.webp',
        sizes: '390x844',
        type: 'image/webp',
        form_factor: 'narrow',
        label: '图片查看器',
      },
      {
        src: 'https://h5static.dewucdn.com/node-common/578d1260-320e-3939-6457-451a48f80d84.webp',
        sizes: '1280x720',
        type: 'image/webp',
        form_factor: 'wide',
        label: '快速开始',
      },
      {
        src: 'https://h5static.dewucdn.com/node-common/037a692b-8e40-58c5-3ae5-3bd2afb376c7.webp',
        sizes: '1280x720',
        type: 'image/webp',
        form_factor: 'wide',
        label: 'Markdown',
      },
      {
        src: 'https://h5static.dewucdn.com/node-common/12d19810-0339-43b3-b492-2896a6e0bd06.webp',
        sizes: '1280x720',
        type: 'image/webp',
        form_factor: 'wide',
        label: '数学公式',
      },
      {
        src: 'https://h5static.dewucdn.com/node-common/569435a6-05ba-9578-41e3-bed35097eb47.webp',
        sizes: '1280x720',
        type: 'image/webp',
        form_factor: 'wide',
        label: '二维码',
      },
    ],
  },
};

export default conf;
