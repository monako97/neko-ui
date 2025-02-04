import { css } from '@moneko/css';

export const style = css`
  .menu {
    --menu-selection: var(--primary-selection);

    max-block-size: 100%;
    display: block;
    overflow-y: auto;
    color: var(--text-color);

    ${['primary', 'success', 'error', 'warning']
      .map(
        (s) =>
          `.${s} {--text-color: var(--${s}-color);--text-heading: var(--${s}-color);--text-secondary: var(--${s}-secondary);--component-bg: var(--${s}-details-bg);--menu-selection: var(--${s}-selection);}`,
      )
      .join('')}
  }

  .menu-item,
  .menu-group,
  .sub-menu {
    border-radius: calc(var(--border-radius) / 1.5);
    transition:
      0.3s background-color var(--transition-timing-function),
      0.3s color var(--transition-timing-function);
    box-sizing: border-box;
    line-height: 1.57;
  }

  .menu-icon {
    font-size: var(--font-size);
  }

  .menu-group {
    position: relative;
  }

  .menu-group-title {
    position: sticky;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    font-size: 12px;
    color: var(--text-secondary);
    inset-block-start: -2px;
    column-gap: 5px;
  }

  .menu-label {
    flex: 1;
  }

  .menu-suffix {
    text-align: end;
    color: var(--text-secondary);
  }

  .sub-menu-title {
    display: flex;
    align-items: center;
    border-radius: calc(var(--border-radius) / 1.5);
    padding: 5px 12px;
    column-gap: 5px;
    transition: box-shadow var(--transition-duration) var(--transition-timing-function);

    &:hover:not(&[aria-disabled]:not([aria-disabled='false'])) {
      &:not([aria-selected='true'], .error) {
        background-color: var(--disable-bg);
      }
    }

    > .menu-arrow {
      position: relative;
      display: block;
      inline-size: 12px;
      block-size: 1.5px;
      pointer-events: none;
      color: var(--text-color);
      opacity: 0.5;
      margin-inline-start: 5px;

      &::after,
      &::before {
        position: absolute;
        border-radius: 2px;
        background-color: currentcolor;
        transition:
          transform var(--transition-duration) var(--transition-timing-function),
          color var(--transition-duration) var(--transition-timing-function);
        inline-size: 6px;
        block-size: 1.5px;
        content: '';
      }
    }
  }

  .sub-menu {
    cursor: pointer;

    &:has([aria-selected='true']) > span {
      color: var(--text-heading);
    }
  }

  .sub-menu-children {
    border-radius: calc(var(--border-radius) / 1.5);
    background-color: var(--sub-menu-bg);
    transform-origin: top;

    > div {
      padding: 5px 12px;
    }
  }

  .sub-menu-open {
    > .sub-menu-children {
      animation: menu-open var(--transition-duration) var(--transition-timing-function) forwards;
    }

    > span.sub-menu-title {
      box-shadow: 0 10px 5px 0 rgb(0 0 0 / 1%);

      > .menu-arrow {
        &::after {
          transform: rotate(-45deg) translate3d(-1.5px, -1px, 1px);
        }

        &::before {
          transform: rotate(45deg) translate3d(1.5px, -1px, 1px);
        }
      }
    }
  }

  .sub-menu-close {
    > .sub-menu-children {
      animation: menu-close var(--transition-duration) var(--transition-timing-function) forwards;
    }

    > span.sub-menu-title {
      box-shadow: 0 0 0 0 rgb(0 0 0 / 0%);

      > .menu-arrow {
        &::after {
          transform: rotate(45deg) translate3d(-1px, 2px, 1px);
        }

        &::before {
          transform: rotate(-45deg) translate3d(1px, 2px, 1px);
        }
      }
    }
  }

  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 12px;
    cursor: pointer;
    column-gap: 5px;
    color: var(--text-color);

    &:hover:not(&[aria-disabled]:not([aria-disabled='false'])) {
      &:not([aria-selected='true']) {
        color: var(--text-heading);
        background-color: var(--disable-bg);
      }
    }

    &[aria-disabled]:not([aria-disabled='false']) {
      cursor: not-allowed;
      color: var(--disable-color);
    }

    &[aria-selected='true'] {
      color: var(--text-heading);
      background-color: var(--menu-selection);

      & + & {
        border-start-end-radius: 0;
        border-start-start-radius: 0;
      }

      &:has(+ &[aria-selected='true']) {
        border-end-end-radius: 0;
        border-end-start-radius: 0;
      }
    }
  }

  @keyframes menu-open {
    from {
      transform: scaleY(0);
      block-size: 0;
      opacity: 0;
    }

    to {
      transform: scaleY(1);
      block-size: var(--h);
      opacity: 1;
    }
  }

  @keyframes menu-close {
    from {
      transform: scaleY(1);
      block-size: var(--h);
      opacity: 1;
    }

    to {
      transform: scaleY(0);
      block-size: 0;
      opacity: 0;
    }
  }
`;
