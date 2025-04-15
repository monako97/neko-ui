import { isFunction } from '@moneko/common';

import * as NekoUI from '../components';

for (const key in NekoUI) {
  if (Object.prototype.hasOwnProperty.call(NekoUI, key)) {
    const element = NekoUI[key as keyof typeof NekoUI];

    if (isFunction(element) && 'registry' in element && isFunction(element.registry)) {
      element.registry();
    }
  }
}
