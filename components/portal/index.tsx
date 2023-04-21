import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  container?: Element | DocumentFragment;
}
function Portal({ children, container = document.body }: PortalProps) {
  return createPortal(children, container);
}

export default Portal;
