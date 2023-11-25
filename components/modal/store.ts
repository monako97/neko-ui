import { createEffect, createRoot, createSignal, getOwner } from 'solid-js';
import { updateStyleRule } from '@moneko/common';

function createModal() {
  const [num, setNum] = createSignal(0);

  createEffect(() => {
    const count = num();

    if (count === 0) {
      updateStyleRule({ 'overflow-y': '' }, 'body');
    } else if (count === 1) {
      updateStyleRule({ 'overflow-y': 'hidden' }, 'body');
    }
  });
  return {
    num,
    setNum,
  };
}

export default createRoot(createModal, getOwner());
