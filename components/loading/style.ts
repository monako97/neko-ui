import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  box: prefixCls('loading-box'),
  content: prefixCls('loading-content'),
  loading: prefixCls('loading'),
};

injectGlobal`
  .${cls.box} {
    position: relative;
    box-sizing: border-box;
  }
  .${cls.content} {
    opacity: 1;
    transition: opacity 0.3s;
  }
  .${cls.loading} {
    cursor: not-allowed;
    .${cls.content} {
      opacity: 0.3;
      pointer-events: none;
      user-select: none;
    }

    &::before {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      border: 1px solid;
      border-color: var(--text-secondary) transparent;
      border-radius: 16px;
      font-size: large;
      text-align: center;
      inline-size: 32px;
      block-size: 32px;
      inset-block-start: 0;
      inset-block-end: 0;
      inset-inline-start: 0;
      inset-inline-end: 0;
      box-sizing: border-box;
      content: '✲';
      animation: loading-rotate-effect 1s infinite;
    }
  }

  @keyframes loading-rotate-effect {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
