import { css } from '@moneko/css';
import { customElement } from 'solid-element';
import { projectInfo } from '@/utils';

function Footer() {
  const year = new Date().getFullYear();
  const style = css`
    .n-site-footer {
      display: flex;
      justify-content: center;
      font-size: var(--font-size-sm);
      padding-block: 32px;
      line-height: 16px;
    }

    .n-site-footer-link {
      text-decoration: none;
      color: var(--text-color);
      transition-duration: var(--transition-duration);
      transition-timing-function: var(--transition-timing-function);
      transition-property: background-color, color;
    }
  `;

  return (
    <>
      <style>{style}</style>
      <footer class="n-site-footer">
        <p>
          <a
            class="n-site-footer-link"
            href={projectInfo.repository?.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {projectInfo.title}&nbsp;
          </a>
          Ⓒ {year} Made with ❤️‍🔥 by&nbsp;
          <a
            class="n-site-footer-link"
            href={projectInfo.author?.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {projectInfo.author?.name}
          </a>
        </p>
      </footer>
    </>
  );
}

export interface FooterElement {
  ref?: FooterElement | { current: FooterElement | null };
}

customElement('site-footer', Footer);
