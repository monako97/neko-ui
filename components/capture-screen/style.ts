import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  captureScreen: prefixCls('capture-screen'),
  view: prefixCls('capture-screen-view'),
  recording: prefixCls('capture-screen-recording'),
  paused: prefixCls('capture-screen-paused'),
  record: prefixCls('capture-screen-record'),
  controller: prefixCls('capture-screen-controller'),
  btn: prefixCls('capture-screen-btn'),
};

injectGlobal`
  .${cls.captureScreen} {
    display: block;
  }
  .${cls.view} {
    position: relative;
  }
  .${cls.view} video {
    border: var(--border-base);
    border-radius: var(--border-radius);
    inline-size: 100%;
    transition: border-color var(--transition-duration) var(--transition-timing-function);
  }
  .${cls.recording}, .${cls.paused} {
    position: absolute;
    inset-block-start: 5px;
    inset-inline-end: 5px;
    border-radius: 50%;
    inline-size: 10px;
    block-size: 10px;
  }
  .${cls.recording} {
    background-color: var(--success-color, #52c41a);
    animation: record-fade-loop-effect 2s infinite;
  }
  .${cls.paused} {
    background-color: var(--warning-color, #faad14);
  }
  .${cls.controller} {
    display: flex;
    margin: 16px 0;
  }
  .${cls.btn} {
    margin-inline-end: 16px;
  }
  .${cls.record} {
    display: flex;
    margin-inline-start: 16px;

    &::before {
      display: block;
      border-inline-start: 1px solid var(--border-color);
      block-size: 100%;
      transition: border-color var(--transition-duration) var(--transition-timing-function);
      transform: translateX(-16px);
      content: '';
    }
  }

  @keyframes record-fade-loop-effect {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;
