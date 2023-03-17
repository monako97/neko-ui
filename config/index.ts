import { DEV, PACKAGENAME } from '@moneko/core/build/process-env';
import type { PartialConfigType } from '@moneko/core';

const conf: PartialConfigType = {
  devtool: DEV ? 'eval-cheap-module-source-map' : false,
  routeBaseName: `/${PACKAGENAME}`,
  publicPath: `/${PACKAGENAME}`,
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    tags: [
      {
        textContent: `
          (function(l) {
            if (l.search[1] === '/' ) {
              var decoded = l.search.slice(1).split('&').map(function(s) { 
                return s.replace(/~and~/g, '&')
              }).join('?');
              window.history.replaceState(null, null,
                  l.pathname.slice(0, -1) + decoded + l.hash
              );
            }
          }(window.location))
        `,
      },
    ],
  },
  designSize: 1920,
  fallbackCompPath: '@/components/fallback',
  externals: [/(.+)\/__tests__\/(.+)/i],
  importOnDemand: {
    lodash: {
      transform: 'lodash/${member}',
    },
  },
};

export default conf;
