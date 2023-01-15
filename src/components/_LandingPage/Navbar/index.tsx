// Assets
import logo from "../../../assets/images/logo/logo-full-transparent.png";

// Styles
import styles from "./styles.module.scss";

interface Props {
  links: Array<any>;
}

const Navbar = ({ links }: Props) => {
  return (
    <div className={styles.__navbar}>
      <img className={styles.__logo} src={logo} alt="logo savime" />
      <nav>
        <ul>
          {links.map((link) => {
            return (
              <li>
                <a href={link.target}>{link.name}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
