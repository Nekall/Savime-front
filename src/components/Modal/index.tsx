// Styles
import styles from "./styles.module.scss";

const Modal = ({ children }: any) => {
  return (
    <div className={styles.__modal}>
      <div className={styles.__content}>{children}</div>
    </div>
  );
};

export default Modal;
