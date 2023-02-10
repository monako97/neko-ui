import { classNames } from '@moneko/common';
import React, {
  type CSSProperties,
  forwardRef,
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { sliderPickerCss } from './style';

type RGB = {
  r: number;
  g: number;
  b: number;
};

export interface HueSliderProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  value?: RGB;
  // eslint-disable-next-line no-unused-vars
  onChange?: (color: RGB) => void;
}

type CanvasMouseEvent = ReactMouseEvent<HTMLDivElement>;

export type HueInstance = {
  canvas?: HTMLCanvasElement | null;
};

const HueSlider: ForwardRefRenderFunction<HueInstance, HueSliderProps> = (
  { className, value = { r: 255, g: 0, b: 255 }, onChange, ...props },
  ref
) => {
  const hueSlider = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(value);
  const [drag, setDrag] = useState(false);
  const [hueRect, setHueRect] = useState({
    width: 172,
    height: 10,
  });
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef<number>(offset);
  const initStrip = useCallback(() => {
    if (hueSlider.current) {
      const ctx2 = hueSlider.current.getContext('2d');

      if (ctx2) {
        ctx2.rect(0, 0, hueRect.width, hueRect.height);
        const grd1 = ctx2.createLinearGradient(0, 0, hueRect.width, 0);

        grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
        grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
        ctx2.fillStyle = grd1;
        ctx2.fill();
      }
    }
  }, [hueRect]);
  const changeHue = useCallback(() => {
    const ctx2 = hueSlider.current?.getContext('2d');

    if (ctx2) {
      const rgbData = ctx2.getImageData(offsetRef.current, 0, 1, 1).data;

      setColor({ r: rgbData[0], g: rgbData[1], b: rgbData[2] });
    }
  }, []);
  const onMouseDown = useCallback(
    ({ nativeEvent: { offsetX } }: CanvasMouseEvent) => {
      const _offset = offsetX - 5;

      setDrag(true);
      setOffset(_offset);
      Object.assign(offsetRef, {
        current: _offset,
      });
      changeHue();
    },
    [changeHue]
  );
  const onMouseMove = useCallback(
    ({ movementX }: MouseEvent) => {
      if (drag) {
        const maxOffset = hueRect.width - 6;
        let _offset = offsetRef.current + movementX;

        if (_offset <= 0) {
          _offset = 0;
        }
        if (_offset > maxOffset) {
          _offset = maxOffset;
        }
        Object.assign(offsetRef, {
          current: _offset,
        });
        changeHue();
        setOffset(_offset);
      }
    },
    [changeHue, drag, hueRect.width]
  );
  const onMouseUp = useCallback(() => {
    setDrag(false);
  }, []);

  useEffect(() => {
    initStrip();
  }, [initStrip]);
  useEffect(() => {
    onChange?.(color);
  }, [onChange, color]);

  useImperativeHandle(ref, () => ({
    canvas: hueSlider.current,
  }));
  useEffect(() => {
    document.body.addEventListener('mouseup', onMouseUp, false);
    document.body.addEventListener('mousemove', onMouseMove, false);
    return () => {
      document.body.removeEventListener('mouseup', onMouseUp, false);
      document.body.removeEventListener('mousemove', onMouseMove, false);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div
      {...props}
      ref={(e) => {
        if (e && hueRect.width !== e.offsetWidth && hueRect.height !== e.offsetHeight) {
          setHueRect({
            width: e.offsetWidth,
            height: e.offsetHeight,
          });
        }
      }}
      className={classNames(sliderPickerCss, className)}
      style={
        {
          '--offset-x': `${offset}px`,
        } as CSSProperties
      }
      onMouseDown={onMouseDown}
    >
      <canvas ref={hueSlider} width={hueRect.width} height={hueRect.height} />
    </div>
  );
};

export default forwardRef(HueSlider);
