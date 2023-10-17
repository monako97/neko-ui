import type { ConfigType } from '@moneko/core';

const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    tags: [
      {
        tag: 'script',
        textContent: `function replaceChildrenPolyfill() {
          for (var _len = arguments.length, newChildren = new Array(_len), _key = 0; _key < _len; _key++) {
            newChildren[_key] = arguments[_key];
          }
          var _this = this;
          while (this.firstChild) {
            this.removeChild(this.firstChild);
          }
          newChildren.forEach(function (child) {
            if (typeof child === 'string') {
              _this.appendChild(document.createTextNode(child));
            } else {
              _this.appendChild(child);
            }
          });
        }
        if (!Element.prototype.replaceChildren) {
          Element.prototype.replaceChildren = replaceChildrenPolyfill;
        }
        if (!ShadowRoot.prototype.replaceChildren) {
          ShadowRoot.prototype.replaceChildren = replaceChildrenPolyfill;
        }`,
      },
      {
        tag: 'script',
        src: 'https://cdn.statically.io/gh/monako97/cdn/main/npm/n-katex/1.0.8/umd/index.js',
      },
      {
        tag: 'script',
        src: 'https://cdn.statically.io/gh/monako97/cdn/main/npm/n-code-live/1.0.7/umd/index.js',
      },
    ],
  },
  polyfill: true,
  fallbackCompPath: '@/components/fallback',
  rem: {
    designSize: 1920,
  },
  bundleAnalyzer: {
    analyzerMode: 'static',
    reportFilename: 'report.html',
    openAnalyzer: false,
  },
  externals: [/(.+)\/__tests__\/(.+)/i],
  importOnDemand: {
    '@moneko/common': {
      transform: 'lib/${member}',
    },
    lodash: {
      transform: '${member}',
    },
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
