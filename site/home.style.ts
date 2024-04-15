import { css } from '@moneko/css';

export const style = css`
  .site-colors {
    display: flex;
    overflow-x: auto;
    border-radius: var(--border-radius);
    padding: 24px;
    background-color: var(--component-bg);
    box-shadow: 0 2px 8px 0 var(--primary-shadow);
    margin-block-end: 24px;
    gap: 12px;
  }

  .site-color {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 5px;

    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: var(--border-radius);
      padding: 8px 12px;
      color: #fff;
      cursor: pointer;
      transition-property: background-color;

      &,
      span {
        transition-timing-function: var(--transition-timing-function);
        transition-duration: var(--transition-duration);
      }

      span {
        color: var(--text-color);
        transition-property: opacity, color;

        &:first-of-type::before {
          content: attr(data-name);
        }

        &:last-of-type {
          font-size: var(--font-size-xs);
          opacity: 0.8;
        }
      }

      &:hover span:first-of-type {
        &::before {
          content: attr(data-val);
        }
      }
    }
  }
`;
