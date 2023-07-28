import { css } from '@moneko/css';

export const selectPortalCss = css`
  .portal {
    inline-size: 232px;
  }

  .portal n-menu::part(menu) {
    display: flex;
    flex-wrap: wrap;
    max-block-size: 250px;
    gap: 4px;
  }

  .portal n-menu::part(item) {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 0;
    inline-size: calc((100% - 8px) / 3);
    border-radius: 4px;
  }

  .portal n-menu::part(suffix) {
    display: none;
  }
`;

export const selectCss = css`
  .select {
    min-inline-size: unset;
    inline-size: 70px;
    text-align: center;
  }
`;
