import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>Created by Carl Balita</p>

      <div className="footer-links">
        <a
          href="https://www.linkedin.com/in/carl-amiel-balita-470b562bb/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          <FaLinkedin size={20} />
        </a>

        <a
          href="https://github.com/amielitoss"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          <FaGithub size={20} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;