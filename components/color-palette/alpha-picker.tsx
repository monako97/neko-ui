import { classNames } from '@moneko/common';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import getPrefixCls from '../get-prefix-cls';
import './alpha-picker.global.less';

export interface AlphaPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  // eslint-disable-next-line no-unused-vars
  onChange?: (alpha: number) => void;
}

const AlphaPicker: React.FC<AlphaPickerProps> = ({ className, value = 1, onChange }) => {
  const alphaStrip = useRef<HTMLDivElement>(null);
  const [dragAlphaStrip, setDragAlphaStrip] = useState(false);
  const [alpha, setAlpha] = useState(value);

  const alphaChange = useCallback(({ offsetX }: { offsetX: number }) => {
    const maxOffset = (alphaStrip.current?.offsetWidth || 10) - 10;
    let offset = offsetX - 5;
    let val = offset / maxOffset;

    if (offset < 0) {
      offset = 0;
    }
    if (offset > maxOffset) {
      offset = maxOffset;
    }
    if (val < 0) {
      val = 0;
    }
    if (val > 1) {
      val = 1;
    }
    setAlpha(val);
    alphaStrip.current?.style.setProperty('--offset-x', `${offset}px`);
  }, []);
  const alphaMouseDown = useCallback(
    ({ nativeEvent: { offsetX } }: React.MouseEvent<HTMLDivElement>) => {
      setDragAlphaStrip(true);
      alphaChange({ offsetX });
    },
    [alphaChange]
  );
  const alphaMouseMove = useCallback(
    ({ nativeEvent: { offsetX } }: React.MouseEvent<HTMLDivElement>) => {
      if (dragAlphaStrip) {
        alphaChange({ offsetX });
      }
    },
    [dragAlphaStrip, alphaChange]
  );
  const alphaMouseUp = useCallback(() => {
    setDragAlphaStrip(false);
  }, []);

  useEffect(() => {
    onChange?.(alpha);
  }, [onChange, alpha, dragAlphaStrip]);

  return (
    <div
      ref={alphaStrip}
      className={classNames(getPrefixCls('line-picker'), className)}
      onMouseDown={alphaMouseDown}
      onMouseMove={alphaMouseMove}
      onMouseUp={alphaMouseUp}
      onMouseOut={alphaMouseUp}
    >
      <div className={getPrefixCls('alpha-strip')} />
    </div>
  );
};

export default AlphaPicker;
