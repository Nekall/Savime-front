// Assets
import github from "../../assets/images/icon/github.svg";
import devto from "../../assets/images/icon/devdotto.svg";
import twitter from "../../assets/images/icon/twitter.svg";
import logo from "../../assets/images/logo/logo-full-transparent.png";

// Styles
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={styles.__footer}>
      <div className={styles.__watermark}>
        <p>
          {" "}
          <span>Ⓢ</span>{" "}
          <img className={styles.__logo} src={logo} alt="logo savime" /> - Tous
          droits libérés {new Date().getFullYear()}
        </p>
      </div>
      <div className={styles.__social_media}>
        <ul>
          <li>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitter} alt="twitter" />
            </a>
          </li>
          <li>
            <a href="https://dev.to/" target="_blank" rel="noopener noreferrer">
              <img src={devto} alt="dev.to" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} alt="github" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
