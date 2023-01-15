// Styles
import styles from "./styles.module.scss";

// Assets
import logo from "../../assets/images/logo/logo-full-transparent.png";

const Header = () => {
  return (
    <div className={styles.__navbar}>
      <img className={styles.__logo} src={logo} alt="logo " />
    </div>
  );
};

export default Header;
