import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { injectGlobal } from '@emotion/css';
import { classNames } from '@moneko/common';
import sso from 'shared-store-object';
import Carousel from '../carousel';
import Portal from '../portal';
import prefixCls from '../prefix-cls';

const cls = {
  photo: prefixCls('photo'),
  portal: prefixCls('photo-portal'),
  open: prefixCls('photo-open'),
  closeing: prefixCls('photo-closeing'),
  close: prefixCls('photo-close'),
  header: prefixCls('photo-header'),
  item: prefixCls('photo-item'),
  img: prefixCls('photo-img'),
};
const photoCss = `
  .${cls.item} {
    position: relative;
    width: 100%;
    height: 100%;
    background: var(--img) center/cover no-repeat;
  }
  .${cls.img} {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: contain;
    content-visibility: auto;
    backdrop-filter: blur(16px);
  }

  .${cls.close} {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    color: #fff;
    transition: transform 0.3s;
    cursor: pointer;
    transform: scale(0);

    &::before {
      content: '\ue720';
      padding: 0 16px;
      line-height: 46px;
    }
  }
  .${cls.portal} {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(50px);
    .${cls.photo} {
      border-radius: 0;
      height: 100%;
    }

    &:hover {
      .${cls.close} {
        transform: scale(1);
      }
    }
  }
  .${cls.open} {
    animation: photo-in 0.3s forwards;
  }
  .${cls.closeing} {
    animation: photo-out 0.3s forwards;
  }

  @keyframes photo-in {
    from {
      transform: scale(0);
      opacity: 0;
    }

    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes photo-out {
    from {
      transform: scale(1);
      opacity: 1;
    }

    to {
      transform: scale(0);
      opacity: 0;
    }
  }
`;

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
      <Carousel {...props} className={classNames(cls.photo, props.className)}>
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
              <img className={cls.img} src={item.src} alt={item.alt} />
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
            className={classNames(
              cls.portal,
              props.open === false ? cls.closeing : props.open ? cls.open : ''
            )}
            onAnimationEnd={handleDestroy}
          >
            {renderDom}
            <span
              className={classNames('neko-icon', cls.close)}
              onClick={photo.current.onOpenChange}
            />
          </div>
        </Portal>
      ) : null;
    }
    return renderDom;
  }, [handleDestroy, open, props.open, renderDom]);

  useEffect(() => {
    if (props.open === true) {
      photo.current.open = true;
    }
  }, [props.open]);
  useEffect(() => {
    const _photo = photo.current;

    injectGlobal([photoCss]);
    return () => {
      _photo();
    };
  }, []);

  return render;
}

export default Photo;
