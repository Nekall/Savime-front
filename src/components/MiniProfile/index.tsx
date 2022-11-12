// Styles
import styles from "./styles.module.scss";

const MiniProfile = () => {
  return (
    <div className={styles.__mini_profile}>
      <div className={styles.__profile_picture}></div>
      <p className={styles.__names}>firstname_lastname</p>
      <p className={styles.__adress_mail}>email@adress.com</p>
      <p className={styles.__adress_mail}>Neka Corp</p>
    </div>
  );
};

export default MiniProfile;
