import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  container: Element | DocumentFragment;
}
function Portal(props: PortalProps) {
  return createPortal(props.children, props.container);
}

export default Portal;
