import { author, projectName, repository } from 'app:info';

import './footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer class="n-site-footer">
      <p>
        <a
          class="n-site-footer-link"
          href={repository.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {projectName}
        </a>
        {` Ⓒ ${year} Made with ❤️‍🔥 by `}
        <a class="n-site-footer-link" href={author.url} target="_blank" rel="noopener noreferrer">
          {author.name}
        </a>
      </p>
    </footer>
  );
}

export default Footer;
