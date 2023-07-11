import { css } from '@moneko/css';

export const style = css`
  .trigger {
    --alpha-gradient: repeating-conic-gradient(#eee 0 25%, transparent 0 50%) 0 / 10px 10px;

    display: inline-block;
    border-radius: var(--border-radius);
    inline-size: 25px;
    block-size: 25px;
    background: var(--alpha-gradient);

    &::after {
      display: block;
      border-radius: var(--border-radius);
      inline-size: 100%;
      block-size: 100%;
      background: var(--c, #fff);
      opacity: var(--a, 1);
      box-shadow:
        rgb(0 0 0 / 10%) 0 0 0 1px inset,
        rgb(0 0 0 / 10%) 0 0 4px inset;
      content: '';
      cursor: pointer;
    }
  }

  .trigger.large {
    inline-size: 45px;
    block-size: 25px;
  }

  .trigger.small {
    inline-size: 15px;
    block-size: 15px;
  }

  .trigger.normal {
    inline-size: 25px;
    block-size: 25px;
  }
`;
