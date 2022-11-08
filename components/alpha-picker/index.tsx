import { classNames } from '@moneko/common';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import getPrefixCls from '../get-prefix-cls';
import './index.global.less';

export interface AlphaPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  // eslint-disable-next-line no-unused-vars
  onChange?: (alpha: number) => void;
}

const AlphaPicker: React.FC<AlphaPickerProps> = ({ className, value = 1, onChange }) => {
  const strip = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState(false);
  const [alpha, setAlpha] = useState(value);

  const handleChange = useCallback(({ offsetX }: { offsetX: number }) => {
    const v = offsetX / (strip.current?.offsetWidth || 1);

    setAlpha(v);
    strip.current?.style.setProperty('--offset-x', `${offsetX}px`);
  }, []);
  const handleMouseDown = useCallback(
    ({ nativeEvent: { offsetX } }: React.MouseEvent<HTMLDivElement>) => {
      setDrag(true);
      handleChange({ offsetX });
    },
    [handleChange]
  );
  const handleMouseMove = useCallback(
    ({ nativeEvent: { offsetX } }: React.MouseEvent<HTMLDivElement>) => {
      if (drag) {
        handleChange({ offsetX });
      }
    },
    [drag, handleChange]
  );
  const handleMouseUp = useCallback(() => {
    setDrag(false);
  }, []);

  useEffect(() => {
    onChange?.(alpha);
  }, [onChange, alpha]);

  return (
    <div ref={strip} className={classNames(getPrefixCls('alpha-picker'), className)}>
      <div
        className={getPrefixCls('alpha-strip')}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
      />
    </div>
  );
};

export default AlphaPicker;
