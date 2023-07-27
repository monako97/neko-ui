import { css } from '@moneko/css';

export const selectPortalCss = css`
  .portal {
    inline-size: 232px;
  }

  .portal n-menu::part(menu) {
    display: flex;
    flex-wrap: wrap;
    max-block-size: 250px;
  }

  .portal n-menu::part(item) {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 0;
    inline-size: 33.3%;
  }
`;

export const selectCss = css`
  .select {
    min-inline-size: unset;
    inline-size: 70px;
  }
`;
