// Styles
import styles from "./styles.module.scss";

// Assets
import cross from "../../assets/images/icon/cross.svg";

const Modal = ({ setModalOpen, children }: any) => {
  return (
    <div className={styles.__modal}>
      <div className={styles.__content}>
        <div className={styles.__close}>
          <button
            type="button"
            className={styles.__btn}
            onClick={() => setModalOpen(false)}
          >
            <img src={cross} alt="Close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
