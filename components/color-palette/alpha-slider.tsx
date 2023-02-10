import { classNames } from '@moneko/common';
import React, {
  type CSSProperties,
  type FC,
  type HTMLAttributes,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { alphaSliderCss, sliderPickerCss } from './style';

export interface AlphaSliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  // eslint-disable-next-line no-unused-vars
  onChange?: (alpha: number) => void;
}

const AlphaSlider: FC<AlphaSliderProps> = ({ className, value = 1, onChange, ...props }) => {
  const alphaStrip = useRef<HTMLDivElement>(null);
  const [dragAlphaStrip, setDragAlphaStrip] = useState(false);
  const [alpha, setAlpha] = useState(value);
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef<number>(offset);

  const alphaChange = useCallback(() => {
    const maxOffset = (alphaStrip.current?.offsetWidth || 172) - 6;
    let val = parseFloat((offsetRef.current / maxOffset).toFixed(2));

    if (val <= 0) {
      val = 0;
    }
    if (val >= 1) {
      val = 1;
    }
    if (val !== alpha) {
      setAlpha(val);
      onChange?.(val);
    }
  }, [alpha, onChange]);

  const alphaMouseDown = useCallback(
    ({ nativeEvent: { offsetX } }: ReactMouseEvent<HTMLDivElement>) => {
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
        const maxOffset = (alphaStrip.current?.offsetWidth || 172) - 6;
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
    const maxOffset = (alphaStrip.current?.offsetWidth || 172) - 6;
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
      {...props}
      ref={alphaStrip}
      className={classNames(sliderPickerCss, className)}
      onMouseDown={alphaMouseDown}
      style={
        {
          '--offset-x': `${offset}px`,
        } as CSSProperties
      }
    >
      <div className={alphaSliderCss} />
    </div>
  );
};

export default AlphaSlider;
