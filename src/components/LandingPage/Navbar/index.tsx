// Assets
import logo from "../../../assets/images/logo/logo-full-transparent.png";

// Styles
import styles from "./styles.module.scss";

const Navbar = () => {
  return (
    <div className={styles.__navbar}>
      <img className={styles.__logo} src={logo} alt="logo savime" />
      <nav>
        <ul>
          <li>
            <a href="#anchor">Loremipsum</a>
          </li>
          <li>
            <a href="#anchor">Curabitur</a>
          </li>
          <li>
            <a href="#anchor">Maecenas</a>
          </li>
          <li>
            <a href="#anchor">Repudiandae</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
