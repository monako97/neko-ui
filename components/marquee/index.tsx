import { isFunction } from '../utils';
import React, { useCallback, useRef } from 'react';

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  onStart?: () => void;
  onStop?: () => void;
}

interface EventTarget {
  stop(): void;
  start(): void;
}

const Marquee: React.FC<MarqueeProps> = ({ children, onStart, onStop, ...props }) => {
  const ref = useRef(null);
  const handleMouse = useCallback(
    (e: MouseEvent) => {
      const target = ref.current as unknown as EventTarget;

      if (e.type === 'mouseover') {
        if (isFunction(target?.stop)) {
          target.stop();
        }
        if (isFunction(onStop)) {
          onStop();
        }
      } else if (e.type === 'mouseout') {
        if (isFunction(target?.start)) {
          target.start();
        }
        if (isFunction(onStart)) {
          onStart();
        }
      }
    },
    [onStart, onStop]
  );

  return React.createElement(
    'marquee',
    {
      ref: ref,
      scrollamount: 10,
      ...props,
      onMouseOver: handleMouse,
      onMouseOut: handleMouse,
    },
    children
  );
};

export default Marquee;
