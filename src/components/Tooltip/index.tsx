// Styles
import styles from "./styles.module.scss";

const Tooltip = () => {
  return (
    <div className={styles.__tooltip}>
        <p>⚠ Certaines fonctionnalités sont désactivées, la base de données étant en pause.</p>
    </div>
  );
};

export default Tooltip;
