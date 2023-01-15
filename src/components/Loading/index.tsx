// Assets
import logo from "../../assets/images/loading.gif";

// Styles
import styles from "./styles.module.scss";

const Loading = () => (
  <div className={styles.__loading}>
    <img
      className={styles.__animated_logo}
      src={logo}
      alt="Logo de chargement"
    />
  </div>
);

export default Loading;
