import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  photo: prefixCls('photo'),
  portal: prefixCls('photo-portal'),
  open: prefixCls('photo-open'),
  closeing: prefixCls('photo-closeing'),
  close: prefixCls('photo-close'),
  header: prefixCls('photo-header'),
  item: prefixCls('photo-item'),
  img: prefixCls('photo-img'),
};

injectGlobal`
  .${cls.item} {
    position: relative;
    inline-size: 100%;
    block-size: 100%;
    background: var(--img) center/cover no-repeat;
  }
  .${cls.img} {
    position: relative;
    z-index: 1;
    inline-size: 100%;
    block-size: 100%;
    object-fit: contain;
    content-visibility: auto;
    backdrop-filter: blur(16px);
    border-radius: 8px;
  }

  .${cls.close} {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    z-index: 1;
    color: #fff;
    transition: transform 0.3s;
    cursor: pointer;
    transform: scale(0);

    &::before {
      content: '\\e720';
      padding: 0 16px;
      line-height: 46px;
    }
  }
  .${cls.portal} {
    position: fixed;
    inset-block-start: 0;
    inset-inline-start: 0;
    z-index: 99999;
    inline-size: 100vi;
    block-size: 100vb;
    backdrop-filter: blur(50px);
    .${cls.photo} {
      border-radius: 0;
      block-size: 100%;
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
