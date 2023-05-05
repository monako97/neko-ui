import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import sso from 'shared-store-object';
import { cls } from './style';
import Carousel from '../carousel';
import { cx } from '../emotion';
import Portal from '../portal';

export interface ImageData {
  src: string;
  alt?: string;
  key: string | number;
}
export interface PhotoProps {
  className?: string;
  style?: React.CSSProperties;
  data: ImageData[];
  offset?: number;
  open?: boolean;
  dots?: boolean;
  autoplay?: number;
  // eslint-disable-next-line no-unused-vars
  header?: (offset: number) => React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  onOpenChange?: (open: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  onOffsetChange?: (offset: number) => void;
}
function Photo(props: PhotoProps) {
  const photo = useRef(
    sso({
      open: props.open,
      onOpenChange() {
        props.onOpenChange?.(!photo.current.open);
      },
      handleWheel(e: React.WheelEvent<HTMLDivElement> | Event) {
        e.preventDefault();
      },
    })
  );
  const { open } = photo.current;
  const handleDestroy = useCallback(() => {
    if (props.open === false) {
      photo.current.open = false;
    }
  }, [props.open]);

  const renderDom = useMemo(
    () => (
      <Carousel {...props} className={cx(cls.photo, props.className)}>
        {props.data.map((item) => {
          return (
            <div
              className={cls.item}
              key={item.key}
              style={
                {
                  '--img': `url(${item.src})`,
                } as React.CSSProperties
              }
            >
              <img className={cls.img} src={item.src} alt={item.alt} onDragStart={() => false} />
            </div>
          );
        })}
      </Carousel>
    ),
    [props]
  );
  const render = useMemo(() => {
    if (typeof open === 'boolean') {
      return open ? (
        <Portal container={document.body}>
          <div
            className={cx(
              cls.portal,
              props.open === false ? cls.closeing : props.open ? cls.open : ''
            )}
            onAnimationEnd={handleDestroy}
            onWheel={photo.current.handleWheel}
          >
            {renderDom}
            <span className={cx('neko-icon', cls.close)} onClick={photo.current.onOpenChange} />
          </div>
        </Portal>
      ) : null;
    }
    return renderDom;
  }, [handleDestroy, open, props.open, renderDom]);

  useEffect(() => {
    if (props.open === true) {
      photo.current.open = true;
      document.documentElement.addEventListener('mousewheel', photo.current.handleWheel, {
        passive: false,
      });
    } else {
      document.documentElement.removeEventListener('mousewheel', photo.current.handleWheel);
    }
  }, [props.open]);
  useEffect(() => {
    const _photo = photo.current;

    return () => {
      document.documentElement.removeEventListener('mousewheel', _photo.handleWheel);
      _photo();
    };
  }, []);

  return render;
}

export default Photo;
