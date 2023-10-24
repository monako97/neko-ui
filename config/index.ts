import type { ConfigType, HtmlWebpackOption } from '@moneko/core';

const tags: HtmlWebpackOption['tags'] = [
  {
    tag: 'script',
    textContent: `function replaceChildrenPolyfill() {
    for (var l = arguments.length, newChildren = new Array(l), k = 0; k < l; k++) {
      newChildren[k] = arguments[k];
    }
    var self = this;
    while (self.firstChild) {
      self.removeChild(self.firstChild);
    }
    newChildren.forEach(function (child) {
      if (typeof child === 'string') {
        self.appendChild(document.createTextNode(child));
      } else {
        self.appendChild(child);
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
];

const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    tags,
  },
  entry: {
    'n-katex': 'n-katex',
    'n-code-live': 'n-code-live',
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
  conf.entry = void 0;
  conf.htmlPluginOption = {
    ...conf.htmlPluginOption,
    tags: tags.concat([
      {
        tag: 'script',
        src: 'https://cdn.statically.io/gh/monako97/cdn/main/npm/n-katex/1.0.8/umd/index.js',
      },
      {
        tag: 'script',
        src: 'https://cdn.statically.io/gh/monako97/cdn/main/npm/n-code-live/1.0.7/umd/index.js',
      },
    ]),
  };
}

export default conf;
