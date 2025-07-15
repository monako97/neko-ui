import { css } from '@moneko/css';

export const imgCss = css`
  .img {
    max-inline-size: 100%;
    max-block-size: 100%;
    object-fit: contain;
    transition: opacity 0.3s;
  }

  .none {
    pointer-events: none;
    opacity: 0.25;
  }

  .error {
    display: inline-block;
    transform: scale(1);
    min-block-size: 75px;

    &::before {
      position: absolute;
      color: transparent;
      background: #f5f5f5
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath fill='%23e6e6e6' d='M304.128 456.192c48.64 0 88.064-39.424 88.064-88.064s-39.424-88.064-88.064-88.064-88.064 39.424-88.064 88.064 39.424 88.064 88.064 88.064zm0-116.224c15.36 0 28.16 12.288 28.16 28.16s-12.288 28.16-28.16 28.16-28.16-12.288-28.16-28.16 12.288-28.16 28.16-28.16z'/%3E%3Cpath fill='%23e6e6e6' d='M887.296 159.744H136.704C96.768 159.744 64 192 64 232.448v559.104c0 39.936 32.256 72.704 72.704 72.704h198.144L500.224 688.64l-36.352-222.72 162.304-130.56-61.44 143.872 92.672 214.016-105.472 171.008h335.36C927.232 864.256 960 832 960 791.552V232.448c0-39.936-32.256-72.704-72.704-72.704zm-138.752 71.68v.512H857.6c16.384 0 30.208 13.312 30.208 30.208v399.872L673.28 408.064l75.264-176.64zM304.64 792.064H165.888c-16.384 0-30.208-13.312-30.208-30.208v-9.728l138.752-164.352 104.96 124.416-74.752 79.872zm81.92-355.84l37.376 228.864-.512.512-142.848-169.984c-3.072-3.584-9.216-3.584-12.288 0L135.68 652.8V262.144c0-16.384 13.312-30.208 30.208-30.208h474.624L386.56 436.224zm501.248 325.632c0 16.896-13.312 30.208-29.696 30.208H680.96l57.344-93.184-87.552-202.24 7.168-7.68 229.888 272.896z'/%3E%3C/svg%3E")
        no-repeat center / 50% 50%;
      content: '';
      inset-inline-start: 0;
      inset-block-start: 0;
      inline-size: 100%;
      block-size: 100%;
    }

    &::after {
      position: absolute;
      overflow: hidden;
      font-size: 12px;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: white;
      background-color: rgb(0 0 0 / 50%);
      content: attr(alt);
      inset-inline-start: 0;
      inset-block-end: 0;
      inline-size: 100%;
      line-height: 2;
    }
  }
`;
export const style = css`
  .close {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    z-index: 1;
    color: #fff;
    transition: transform var(--transition-duration);
    cursor: pointer;
    transform: scale(0);

    &::before {
      padding: 0 16px;
      font-size: 24px;
      content: '⛌';
      line-height: 46px;
    }
  }

  .portal {
    position: fixed;
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
      position: absolute;
      z-index: -1;
      margin: auto;
      background: var(--img) center/cover no-repeat;
      opacity: 0.5;
      content: '';
      inset-inline-start: 0;
      inset-block-start: 0;
      inset-inline-end: 0;
      inset-block-end: 0;
      inline-size: 100%;
      block-size: 100%;
      pointer-events: none;
    }

    &::after {
      position: absolute;
      z-index: -1;
      content: '';
      inset-inline-start: -10%;
      inset-block-start: -10%;
      inset-inline-end: -10%;
      inset-block-end: -10%;
      margin: auto;
      inline-size: 120%;
      block-size: 120%;
      pointer-events: none;
      backdrop-filter: blur(10px) brightness(80%);
    }

    &:hover {
      .close {
        transform: scale(1);
      }
    }
  }

  .open {
    animation: photo-in var(--transition-duration) forwards;
  }

  .closeing {
    animation: photo-out var(--transition-duration) forwards;
  }

  @keyframes photo-in {
    0% {
      pointer-events: none;
    }

    100% {
      inline-size: 100vw;
      block-size: 100vh;
      inset-block-start: 0;
      inset-inline-start: 0;
    }
  }

  @keyframes photo-out {
    from {
      inline-size: 100vw;
      block-size: 100vh;
      inset-block-start: 0;
      inset-inline-start: 0;
    }

    to {
      pointer-events: none;
    }
  }
`;
