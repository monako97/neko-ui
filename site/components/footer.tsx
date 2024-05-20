import './footer.css';
import app from '@app/info';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer class="n-site-footer">
      <p>
        <a
          class="n-site-footer-link"
          href={app.repository?.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {app.projectName}
        </a>
        {` Ⓒ ${year} Made with ❤️‍🔥 by `}
        <a
          class="n-site-footer-link"
          href={app.author?.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {app.author?.name}
        </a>
      </p>
    </footer>
  );
}

export default Footer;
