import { css } from '@moneko/css';

export const style = css`
  .group {
    display: inline-flex;
    align-items: center;

    & > n-avatar {
      display: flex;
    }

    & > n-avatar:not(:first-child),
    & > n-popover {
      margin-inline-start: -4%;
      transition: margin-inline-start var(--transition-duration);

      &:hover:not(n-popover) {
        margin-inline-start: 4px;

        &:has(+ n-avatar),
        &:has(+ n-popover) {
          margin-inline-end: calc(4% + 4px);
        }
      }
    }
  }
`;
export const moreCss = css`
  .more {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    padding: 8px;
    max-inline-size: 60vi;
    max-block-size: 80vb;
    gap: 8px;
    flex-wrap: wrap;

    & > n-avatar {
      display: flex;
    }
  }
`;
