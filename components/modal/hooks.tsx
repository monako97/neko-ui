import { render } from 'solid-js/web';

import Modal, { type ModalProps } from '.';

const open = (options: ModalProps) => {
  const mount = document.createElement('div');

  const dispose = render(
    () => (
      <Modal
        maskClosable
        escClosable
        {...options}
        open="open"
        onOpenChange={(v) => {
          if (v === 'closed') {
            dispose();
          }
        }}
      />
    ),
    mount,
  );
};

export default open;
