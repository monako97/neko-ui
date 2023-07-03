import frontmatter from 'remark-frontmatter';
import type { ConfigType } from '@moneko/core';

const conf: Partial<ConfigType<'swc'>> = {
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    tags: [
      {
        tag: 'script',
        src: 'https://cdn.jsdelivr.net/npm/n-katex@1.0.5/umd/index.js',
      },
      {
        tag: 'script',
        src: 'https://cdn.jsdelivr.net/npm/n-code-live@1.0.0/umd/index.js',
      },
    ],
  },
  fallbackCompPath: '@/components/fallback',
  designSize: 1920,
  externals: [/(.+)\/__tests__\/(.+)/i],
  importOnDemand: {
    '@moneko/common': {
      transform: 'lib/${member}',
    },
    lodash: {
      transform: '${member}',
    },
  },
  mdx: {
    remarkPlugins: [frontmatter],
  },
};

if (process.env.NODE_ENV === 'production') {
  conf.prefixJsLoader = [
    {
      loader: 'babel-loader',
      options: {
        plugins: ['@moneko/css/babel'],
      },
    },
  ];
}

export default conf;
