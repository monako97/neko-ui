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
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef<number>(offset);

  const alphaChange = useCallback(() => {
    const maxOffset = (alphaStrip.current?.offsetWidth || 10) - 10;
    let val = offsetRef.current / maxOffset;

    if (val < 0) {
      val = 0;
    }
    if (val > 1) {
      val = 1;
    }
    if (val !== alpha) {
      setAlpha(val);
      onChange?.(val);
    }
  }, [alpha, onChange]);

  const alphaMouseDown = useCallback(
    ({ nativeEvent: { offsetX } }: React.MouseEvent<HTMLDivElement>) => {
      const _offset = offsetX - 5;

      setDragAlphaStrip(true);
      setOffset(_offset);
      Object.assign(offsetRef, {
        current: _offset,
      });
      alphaChange();
    },
    [alphaChange]
  );
  const alphaMouseMove = useCallback(
    ({ movementX }: MouseEvent) => {
      if (dragAlphaStrip) {
        const maxOffset = (alphaStrip.current?.offsetWidth || 10) - 10;
        let _offset = offsetRef.current + movementX;

        if (_offset < 0) {
          _offset = 0;
        }
        if (_offset > maxOffset) {
          _offset = maxOffset;
        }
        Object.assign(offsetRef, {
          current: _offset,
        });
        alphaChange();
        setOffset(_offset);
      }
    },
    [dragAlphaStrip, alphaChange]
  );
  const alphaMouseUp = useCallback(() => {
    setDragAlphaStrip(false);
  }, []);

  useEffect(() => {
    const maxOffset = (alphaStrip.current?.offsetWidth || 172) - 10;
    const _offset = alpha * maxOffset;

    Object.assign(offsetRef, {
      current: _offset,
    });
    setOffset(_offset);
  }, [alpha]);
  useEffect(() => {
    if (value !== alpha) {
      setAlpha(value);
      onChange?.(value);
    }
  }, [onChange, alpha, value]);

  useEffect(() => {
    document.body.addEventListener('mouseup', alphaMouseUp, false);
    document.body.addEventListener('mousemove', alphaMouseMove, false);
    return () => {
      document.body.removeEventListener('mouseup', alphaMouseUp, false);
      document.body.removeEventListener('mousemove', alphaMouseMove, false);
    };
  }, [alphaMouseMove, alphaMouseUp]);

  return (
    <div
      ref={alphaStrip}
      className={classNames(getPrefixCls('line-picker'), className)}
      onMouseDown={alphaMouseDown}
      style={
        {
          '--offset-x': `${offset}px`,
        } as React.CSSProperties
      }
    >
      <div className={getPrefixCls('alpha-strip')} />
    </div>
  );
};

export default AlphaPicker;
