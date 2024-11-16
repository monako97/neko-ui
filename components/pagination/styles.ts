import { css } from '@moneko/css';

export const styles = css`
  .pagination {
    ul {
      display: inline-flex;
      align-items: center;
      margin: 0;
      padding: 0;
      list-style: none;
      gap: 4px;
    }
  }

  .pagination-item::part(button) {
    padding: 0 6px;
  }

  .pagination-prev {
    &::part(label) {
      transform: translateX(-25%);
    }
  }

  .pagination-next {
    &::part(label) {
      transform: translateX(25%);
    }
  }

  .pagination-p,
  .pagination-n {
    &::part(button) {
      position: relative;

      &::after {
        position: absolute;
        display: inline-block;
        margin: auto;
        font-size: inherit;
        font-weight: bold;
        opacity: 0.5;
        inline-size: fit-content;
        block-size: fit-content;
        line-height: inherit;
        inset-block: 0;
        inset-inline: 0;
        content: '⋯';
        pointer-events: none;
      }
    }

    &::part(label) {
      opacity: 0;
    }

    &:hover::part(button)::after {
      content: var(--content);
      font-weight: inherit;
    }
  }

  .pagination-p {
    --content: '《';

    &:hover {
      &::part(button)::after {
        transform: translateX(-25%);
      }
    }
  }

  .pagination-n {
    --content: '》';

    &:hover {
      &::part(button)::after {
        transform: translateX(25%);
      }
    }
  }
`;
